
import React from 'react';
import { GraphNode, GraphEdge } from '@/types/AlgorithmTypes';
import { cn } from '@/lib/utils';

interface GraphVisualizerProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ nodes, edges }) => {
  // SVG dimensions
  const width = 600;
  const height = 400;
  
  const getNodeColor = (state: string) => {
    switch (state) {
      case 'visited':
        return 'fill-algo-node-visited stroke-algo-node-visited';
      case 'current':
        return 'fill-algo-node-current stroke-algo-node-current';
      case 'highlighted':
        return 'fill-algo-node-highlighted stroke-algo-node-highlighted';
      default:
        return 'fill-algo-node-default stroke-algo-node-default';
    }
  };
  
  const getNodeById = (id: string) => {
    return nodes.find(node => node.id === id);
  };
  
  return (
    <div className="flex justify-center items-center w-full h-full overflow-auto">
      <svg width={width} height={height} className="bg-muted/30 rounded-lg">
        {/* Edges */}
        {edges.map((edge, index) => {
          const source = getNodeById(edge.source);
          const target = getNodeById(edge.target);
          
          if (!source || !target) return null;
          
          return (
            <g key={`edge-${index}`}>
              <line
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                className="stroke-border stroke-1"
              />
              
              {edge.weight !== undefined && (
                <text
                  x={(source.x + target.x) / 2}
                  y={(source.y + target.y) / 2 - 5}
                  className="text-xs fill-muted-foreground"
                  textAnchor="middle"
                >
                  {edge.weight}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id} className="transition-all duration-300">
            <circle
              cx={node.x}
              cy={node.y}
              r={20}
              className={cn(
                'stroke-2 transition-all duration-300',
                getNodeColor(node.state)
              )}
              opacity={0.8}
            />
            <text
              x={node.x}
              y={node.y}
              className="text-xs fill-white font-medium"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {node.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default GraphVisualizer;
