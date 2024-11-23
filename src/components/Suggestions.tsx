import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SuggestionsProps {
  code: string;
}

export default function Suggestions({ code }: SuggestionsProps) {
  const generateSuggestions = () => {
    const suggestions = [];

    // Performance suggestions
    if (code.includes('forEach') && !code.includes('map')) {
      suggestions.push({
        type: 'performance',
        message: 'Consider using map() instead of forEach() when creating a new array',
      });
    }

    // Best practices
    if (code.includes('==')) {
      suggestions.push({
        type: 'best-practice',
        message: 'Use === for strict equality comparison',
      });
    }

    // Security
    if (code.includes('eval(')) {
      suggestions.push({
        type: 'security',
        message: 'Avoid using eval() as it can lead to security vulnerabilities',
      });
    }

    return suggestions;
  };

  const suggestions = generateSuggestions();

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        <h2 className="text-xl font-semibold">Suggestions</h2>
      </div>

      {suggestions.length === 0 ? (
        <p className="text-gray-400">No suggestions available for the current code.</p>
      ) : (
        <ul className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3"
            >
              <div className="flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-yellow-200">{suggestion.message}</span>
                  <span className="text-xs text-yellow-600 block mt-1">
                    Type: {suggestion.type}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}