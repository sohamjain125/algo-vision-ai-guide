
import React from 'react';
import { TreeNode } from '@/types/AlgorithmTypes';
import { cn } from '@/lib/utils';

interface TreeVisualizerProps {
  root: TreeNode;
}

const NodeComponent: React.FC<{ node: TreeNode; depth: number }> = ({ node, depth }) => {
  if (!node) return null;
  
  const getNodeColor = (state: string) => {
    switch (state) {
      case 'visited':
        return 'bg-algo-node-visited border-algo-node-visited text-white';
      case 'current':
        return 'bg-algo-node-current border-algo-node-current text-white';
      case 'highlighted':
        return 'bg-algo-node-highlighted border-algo-node-highlighted text-black';
      default:
        return 'bg-algo-node-default border-algo-node-default text-white';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-300',
          getNodeColor(node.state)
        )}
      >
        {node.value}
      </div>
      
      {(node.left || node.right) && (
        <div className="mt-2 flex items-start">
          <div className={cn("flex flex-col items-center", !node.left && "opacity-0")}>
            <div className="h-8 w-px bg-border"></div>
            <div className="flex-1">
              {node.left && <NodeComponent node={node.left} depth={depth + 1} />}
            </div>
          </div>
          
          <div className={cn("flex flex-col items-center", !node.right && "opacity-0")}>
            <div className="h-8 w-px bg-border"></div>
            <div className="flex-1">
              {node.right && <NodeComponent node={node.right} depth={depth + 1} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ root }) => {
  if (!root) {
    return <div>No tree data available</div>;
  }

  return (
    <div className="flex justify-center w-full overflow-auto p-4">
      <NodeComponent node={root} depth={0} />
    </div>
  );
};

export default TreeVisualizer;
