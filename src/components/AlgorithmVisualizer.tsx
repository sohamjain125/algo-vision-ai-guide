
import React from 'react';
import ArrayVisualizer from './visualizers/ArrayVisualizer';
import TreeVisualizer from './visualizers/TreeVisualizer';
import GraphVisualizer from './visualizers/GraphVisualizer';
import { Algorithm, VisualizationStep } from '@/types/AlgorithmTypes';
import { InfoCircle, AlertCircle } from 'lucide-react';

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

  // Helper function to determine if this is a key learning step
  const isKeyStep = () => {
    return step.explanation.includes("key") || 
           step.explanation.includes("important") || 
           step.explanation.includes("note");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Step indicator with progress */}
      <div className="w-full mb-6 glass-card p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium gradient-text">Step {currentStep + 1} of {algorithm.steps.length}</h3>
          {isKeyStep() && (
            <div className="flex items-center text-amber-400">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Key concept</span>
            </div>
          )}
        </div>
        <div className="w-full bg-secondary/30 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300" 
            style={{ width: `${((currentStep + 1) / algorithm.steps.length) * 100}%` }}
          />
        </div>
      </div>

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
        <div className="w-full mb-6 glass p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <InfoCircle className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-lg font-medium gradient-text">Variables</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(step.variables).map(([key, value]) => (
              <div key={key} className="bg-card/50 backdrop-blur-sm p-3 rounded-lg flex justify-between hover:bg-card/70 transition-colors">
                <span className="font-medium">{key}:</span>
                <span>{JSON.stringify(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step explanation with enhanced visual styling */}
      <div className="w-full glass-card p-5 rounded-xl border-l-4 border-primary animate-fade-in">
        <h4 className="font-medium mb-2 text-sm uppercase text-primary/80">Explanation</h4>
        <p className="text-sm leading-relaxed">{step.explanation}</p>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
