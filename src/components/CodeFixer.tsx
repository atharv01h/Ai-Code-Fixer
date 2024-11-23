import React, { useState } from 'react';
import { AlertCircle, Wand2 } from 'lucide-react';

interface CodeFixerProps {
  onFix: () => Promise<void>;
  isLoading: boolean;
  aiProvider?: string;
}

export default function CodeFixer({ onFix, isLoading, aiProvider }: CodeFixerProps) {
  const [error, setError] = useState<string | null>(null);

  const handleFix = async () => {
    try {
      setError(null);
      await onFix();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fix code');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wand2 className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-semibold">AI Code Fixer</h2>
        </div>
        {aiProvider && (
          <span className="text-sm text-gray-400">Powered by {aiProvider}</span>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-700/50 rounded-lg flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
          <span className="text-red-200 text-sm">{error}</span>
        </div>
      )}

      <button
        onClick={handleFix}
        disabled={isLoading}
        className={`w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 
          text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 
          transition-colors ${isLoading ? 'cursor-wait' : ''}`}
      >
        <Wand2 className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        <span>{isLoading ? 'Fixing Code...' : 'Auto-Fix with AI'}</span>
      </button>

      <p className="mt-3 text-sm text-gray-400 text-center">
        Uses OpenAI GPT-3.5 with Gemini AI as fallback
      </p>
    </div>
  );
}