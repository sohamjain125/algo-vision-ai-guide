
import React from 'react';
import { Algorithm } from '@/types/AlgorithmTypes';

interface CodeViewProps {
  algorithm: Algorithm;
}

const CodeView: React.FC<CodeViewProps> = ({ algorithm }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-muted rounded-md p-4 overflow-auto h-full">
        <pre className="text-sm font-mono">
          <code>{algorithm.code}</code>
        </pre>
      </div>
      
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium">Time Complexity</h3>
            <p className="text-sm text-muted-foreground">{algorithm.timeComplexity}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Space Complexity</h3>
            <p className="text-sm text-muted-foreground">{algorithm.spaceComplexity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeView;
