
import React from 'react';
import { Algorithm } from '@/types/AlgorithmTypes';

interface CodeViewProps {
  algorithm: Algorithm;
}

const CodeView: React.FC<CodeViewProps> = ({ algorithm }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-muted rounded-md p-4 overflow-auto h-full glass">
        <pre className="text-sm font-mono">
          <code>{algorithm.code}</code>
        </pre>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <h3 className="text-sm font-medium gradient-text mb-2">Time Complexity</h3>
          <p className="text-sm text-muted-foreground">{algorithm.timeComplexity}</p>
        </div>
        <div className="glass-card p-4">
          <h3 className="text-sm font-medium gradient-text mb-2">Space Complexity</h3>
          <p className="text-sm text-muted-foreground">{algorithm.spaceComplexity}</p>
        </div>
      </div>
    </div>
  );
};

export default CodeView;
