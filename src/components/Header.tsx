import React from 'react';
import { Code2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <Code2 className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Code Error Helper</h1>
              <p className="text-gray-400 text-sm">Analyze, fix, and improve your code</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}