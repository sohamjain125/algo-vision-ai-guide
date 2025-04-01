
export type NodeState = 'default' | 'visited' | 'current' | 'highlighted';

export interface ArrayElement {
  value: number;
  state: NodeState;
}

export interface TreeNode {
  value: number;
  state: NodeState;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface GraphNode {
  id: string;
  value: string | number;
  state: NodeState;
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight?: number;
}

export interface VisualizationStep {
  explanation: string;
  array?: ArrayElement[];
  tree?: TreeNode;
  graph?: {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };
  pointers?: {
    [key: string]: number;
  };
  variables?: {
    [key: string]: any;
  };
}

export interface Algorithm {
  id: string;
  name: string;
  category: 'sorting' | 'searching' | 'tree' | 'graph' | 'other';
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  steps: VisualizationStep[];
}

export interface Message {
  id: string;
  role: 'user' | 'system';
  content: string;
}
