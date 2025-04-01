
import React from 'react';
import { ArrayElement } from '@/types/AlgorithmTypes';
import { cn } from '@/lib/utils';

interface ArrayVisualizerProps {
  array: ArrayElement[];
  pointers?: {
    [key: string]: number;
  };
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ array, pointers = {} }) => {
  const getColor = (state: string) => {
    switch (state) {
      case 'visited':
        return 'bg-algo-node-visited text-white';
      case 'current':
        return 'bg-algo-node-current text-white';
      case 'highlighted':
        return 'bg-algo-node-highlighted text-black';
      default:
        return 'bg-algo-node-default text-white';
    }
  };

  const maxValue = Math.max(...array.map(item => item.value), 10);
  
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center items-end h-60 w-full mb-6">
        {array.map((item, index) => {
          const height = `${Math.max(15, (item.value / maxValue) * 100)}%`;
          
          return (
            <div key={index} className="relative flex flex-col items-center mx-1">
              <div 
                className={cn(
                  "w-12 rounded-t transition-all duration-300 flex items-center justify-center text-sm font-medium",
                  getColor(item.state)
                )}
                style={{ height }}
              >
                {item.value}
              </div>
              <div className="mt-2 text-xs">{index}</div>
              
              {/* Pointers */}
              {Object.entries(pointers).map(([name, position]) => 
                position === index && (
                  <div 
                    key={name} 
                    className="absolute -top-8 text-xs font-medium text-primary"
                  >
                    {name}
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-primary mx-auto mt-1"></div>
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex mt-4 space-x-4">
        {Object.entries(pointers).map(([name, position]) => (
          <div key={name} className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
            <span className="text-xs">{name}: {position}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualizer;
