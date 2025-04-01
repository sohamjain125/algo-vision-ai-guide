
import React from 'react';
import { Algorithm, ArrayElement, NodeState } from '@/types/AlgorithmTypes';
import ArrayVisualizer from './visualizers/ArrayVisualizer';
import TreeVisualizer from './visualizers/TreeVisualizer';
import GraphVisualizer from './visualizers/GraphVisualizer';

interface AlgorithmVisualizerProps {
  algorithm: Algorithm;
  currentStep: number;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ algorithm, currentStep }) => {
  const step = algorithm.steps[currentStep];
  
  if (!step) {
    return <div className="flex items-center justify-center h-full">No visualization data available.</div>;
  }
  
  const renderVisualizer = () => {
    if (step.array) {
      return <ArrayVisualizer array={step.array} pointers={step.pointers} />;
    }
    
    if (step.tree) {
      return <TreeVisualizer root={step.tree} />;
    }
    
    if (step.graph) {
      return <GraphVisualizer nodes={step.graph.nodes} edges={step.graph.edges} />;
    }
    
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No visualization available for this algorithm.
      </div>
    );
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        {renderVisualizer()}
      </div>
      
      {step.variables && Object.keys(step.variables).length > 0 && (
        <div className="mt-4 p-4 bg-card rounded-lg">
          <h3 className="text-sm font-medium mb-2">Variables</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {Object.entries(step.variables).map(([key, value]) => (
              <div key={key} className="px-3 py-1 bg-muted rounded text-xs flex justify-between">
                <span className="font-medium">{key}:</span>
                <span>{value?.toString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmVisualizer;
