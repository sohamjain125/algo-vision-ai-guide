
import React, { useState } from 'react';
import { Algorithm } from '@/types/AlgorithmTypes';
import { Button } from '@/components/ui/button';
import { Info, Code, FileText } from 'lucide-react';

interface CodeViewProps {
  algorithm: Algorithm;
}

const CodeView: React.FC<CodeViewProps> = ({ algorithm }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Code className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold gradient-text">{algorithm.name} Implementation</h3>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center space-x-1"
        >
          <Info className="h-4 w-4 mr-1" />
          {showExplanation ? "Hide Explanation" : "Show Explanation"}
        </Button>
      </div>

      {showExplanation && (
        <div className="glass-card p-4 mb-4 animate-fade-in">
          <h4 className="font-medium text-sm mb-2 gradient-text">How to Read This Code</h4>
          <p className="text-sm text-muted-foreground">
            This code implements the {algorithm.name} algorithm. Look for the main function and follow the logic step by step.
            The most important parts are highlighted in the visualization.
          </p>
        </div>
      )}
      
      <div className="bg-muted rounded-md p-4 overflow-auto h-full glass">
        <pre className="text-sm font-mono">
          <code>{algorithm.code}</code>
        </pre>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-2">
            <FileText className="h-4 w-4 text-primary mr-2" />
            <h3 className="text-sm font-medium gradient-text">Time Complexity</h3>
          </div>
          <p className="text-sm text-muted-foreground">{algorithm.timeComplexity}</p>
        </div>
        <div className="glass-card p-4 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-2">
            <FileText className="h-4 w-4 text-primary mr-2" />
            <h3 className="text-sm font-medium gradient-text">Space Complexity</h3>
          </div>
          <p className="text-sm text-muted-foreground">{algorithm.spaceComplexity}</p>
        </div>
      </div>
    </div>
  );
};

export default CodeView;
