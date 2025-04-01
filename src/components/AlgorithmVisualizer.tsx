
import React from 'react';
import ArrayVisualizer from './visualizers/ArrayVisualizer';
import TreeVisualizer from './visualizers/TreeVisualizer';
import GraphVisualizer from './visualizers/GraphVisualizer';
import { Algorithm, VisualizationStep } from '@/types/AlgorithmTypes';

interface AlgorithmVisualizerProps {
  algorithm: Algorithm;
  currentStep: number;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  algorithm,
  currentStep
}) => {
  const step = algorithm.steps[currentStep];
  
  if (!step) {
    return <div className="text-center p-8">No step data available</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {step.array && (
        <div className="w-full mb-8 glass p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-4 gradient-text">Array Visualization</h3>
          <ArrayVisualizer elements={step.array} pointers={step.pointers} />
        </div>
      )}
      
      {step.tree && (
        <div className="w-full mb-8 glass p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-4 gradient-text">Tree Visualization</h3>
          <TreeVisualizer root={step.tree} />
        </div>
      )}
      
      {step.graph && (
        <div className="w-full mb-8 glass p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-4 gradient-text">Graph Visualization</h3>
          <GraphVisualizer nodes={step.graph.nodes} edges={step.graph.edges} />
        </div>
      )}
      
      {step.variables && Object.keys(step.variables).length > 0 && (
        <div className="w-full mb-4 glass p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-4 gradient-text">Variables</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(step.variables).map(([key, value]) => (
              <div key={key} className="bg-card/50 backdrop-blur-sm p-3 rounded-lg flex justify-between">
                <span className="font-medium">{key}:</span>
                <span>{JSON.stringify(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmVisualizer;
