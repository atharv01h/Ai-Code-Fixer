import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAnalyzerProps {
  errors: string[];
}

export default function ErrorAnalyzer({ errors }: ErrorAnalyzerProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
      <div className="flex items-center space-x-2 mb-4">
        <AlertCircle className="w-5 h-5 text-red-400" />
        <h2 className="text-xl font-semibold">Error Analysis</h2>
      </div>
      
      {errors.length === 0 ? (
        <p className="text-gray-400">No errors detected. Your code looks good!</p>
      ) : (
        <ul className="space-y-3">
          {errors.map((error, index) => (
            <li key={index} className="bg-red-900/20 border border-red-700/50 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                <span className="text-red-200">{error}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}