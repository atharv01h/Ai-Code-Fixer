import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize AI clients with proper error handling
const createAIClients = () => {
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  let openaiClient: OpenAI | null = null;
  let geminiClient: any | null = null;

  if (openaiKey) {
    openaiClient = new OpenAI({
      apiKey: openaiKey,
      dangerouslyAllowBrowser: true
    });
  }

  if (geminiKey) {
    geminiClient = new GoogleGenerativeAI(geminiKey);
  }

  return { openaiClient, geminiClient };
};

const { openaiClient, geminiClient } = createAIClients();

export async function getAICodeFix(code: string, language: string, errors: string[]) {
  // Check if any AI service is available
  if (!openaiClient && !geminiClient) {
    throw new Error('No AI services are configured. Please add API keys in your .env file.');
  }

  // Try OpenAI first if available
  if (openaiClient) {
    try {
      const openAIResponse = await openaiClient.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert code reviewer and fixer. Analyze the following ${language} code and provide fixes for the errors.`
          },
          {
            role: "user",
            content: `Code:\n${code}\n\nErrors:\n${errors.join('\n')}`
          }
        ]
      });

      return {
        fixedCode: openAIResponse.choices[0].message.content,
        provider: 'OpenAI'
      };
    } catch (error) {
      console.error('OpenAI error:', error);
      // Continue to Gemini fallback
    }
  }

  // Try Gemini if available
  if (geminiClient) {
    try {
      const model = geminiClient.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        `Fix the following ${language} code:\n${code}\n\nErrors to address:\n${errors.join('\n')}`
      );
      const response = await result.response;
      
      return {
        fixedCode: response.text(),
        provider: 'Gemini'
      };
    } catch (error) {
      console.error('Gemini error:', error);
    }
  }

  throw new Error('All configured AI services failed to process the request');
}