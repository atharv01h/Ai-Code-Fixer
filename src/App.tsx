import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { AlertCircle, Code2, Lightbulb, Wand2 } from 'lucide-react';
import ErrorAnalyzer from './components/ErrorAnalyzer';
import Suggestions from './components/Suggestions';
import Header from './components/Header';
import CodeFixer from './components/CodeFixer';
import { getAICodeFix } from './services/ai';

function App() {
  const [code, setCode] = useState<string>('// Paste your code here\n');
  const [language, setLanguage] = useState('javascript');
  const [errors, setErrors] = useState<string[]>([]);
  const [isFixing, setIsFixing] = useState(false);
  const [aiProvider, setAiProvider] = useState<string>();

  const analyzeCode = () => {
    const newErrors = [];
    try {
      new Function(code);
    } catch (e) {
      if (e instanceof Error) {
        newErrors.push(e.message);
      }
    }

    if (code.includes('console.log(')) {
      newErrors.push('Consider removing console.log statements in production code');
    }
    if (code.includes('var ')) {
      newErrors.push('Use const or let instead of var for better scoping');
    }

    setErrors(newErrors);
  };

  const handleAutoFix = async () => {
    if (!errors.length) return;
    
    setIsFixing(true);
    try {
      const { fixedCode, provider } = await getAICodeFix(code, language, errors);
      setCode(fixedCode || code);
      setAiProvider(provider);
      analyzeCode();
    } catch (error) {
      console.error('Failed to fix code:', error);
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-semibold">Code Editor</h2>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-gray-700 text-white rounded px-3 py-1 border border-gray-600"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                </select>
              </div>
              <div className="h-[500px] rounded-lg overflow-hidden border border-gray-700">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    padding: { top: 16 },
                  }}
                />
              </div>
              <button
                onClick={analyzeCode}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Wand2 className="w-4 h-4" />
                <span>Analyze Code</span>
              </button>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="space-y-6">
            <ErrorAnalyzer errors={errors} />
            <CodeFixer 
              onFix={handleAutoFix} 
              isLoading={isFixing}
              aiProvider={aiProvider}
            />
            <Suggestions code={code} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 border-t border-gray-700 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          Creator: Atharv Hatwar
        </div>
      </footer>
    </div>
  );
}

export default App;