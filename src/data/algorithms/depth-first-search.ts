
import { Algorithm, NodeState } from '@/types/AlgorithmTypes';

// Create a sample graph for DFS visualization
const createSampleGraph = () => {
  const nodes = [
    { id: 'A', value: 'A', state: 'default' as NodeState, x: 100, y: 100 },
    { id: 'B', value: 'B', state: 'default' as NodeState, x: 200, y: 50 },
    { id: 'C', value: 'C', state: 'default' as NodeState, x: 200, y: 150 },
    { id: 'D', value: 'D', state: 'default' as NodeState, x: 300, y: 100 },
    { id: 'E', value: 'E', state: 'default' as NodeState, x: 400, y: 50 },
    { id: 'F', value: 'F', state: 'default' as NodeState, x: 400, y: 150 }
  ];
  
  const edges = [
    { source: 'A', target: 'B' },
    { source: 'A', target: 'C' },
    { source: 'B', target: 'D' },
    { source: 'C', target: 'D' },
    { source: 'D', target: 'E' },
    { source: 'D', target: 'F' }
  ];
  
  return { nodes, edges };
};

export const depthFirstSearch: Algorithm = {
  id: 'depth-first-search',
  name: 'Depth-First Search',
  category: 'graph',
  description: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking.',
  timeComplexity: 'O(V + E) where V is the number of vertices and E is the number of edges',
  spaceComplexity: 'O(V) for the recursion stack',
  code: `// Depth-First Search implementation
function depthFirstSearch(graph, startNode, visited = new Set()) {
  console.log(startNode); // Process current node
  visited.add(startNode);
  
  // Get all adjacent vertices of the current node
  const neighbors = graph[startNode] || [];
  
  // Recursively visit all unvisited neighbors
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      depthFirstSearch(graph, neighbor, visited);
    }
  }
}

// Example usage:
const graph = {
  'A': ['B', 'C'],
  'B': ['D'],
  'C': ['D'],
  'D': ['E', 'F'],
  'E': [],
  'F': []
};

// Start DFS from node 'A'
depthFirstSearch(graph, 'A');`,
  pseudocode: `DFS(graph, startNode):
  mark startNode as visited
  process startNode (print, store, etc.)
  
  for each neighbor of startNode:
    if neighbor is not visited:
      DFS(graph, neighbor)
`,
  steps: [
    {
      explanation: "We start with an unvisited graph. We'll begin our Depth-First Search from node A.",
      graph: {
        nodes: createSampleGraph().nodes,
        edges: createSampleGraph().edges
      },
      variables: {
        visited: [],
        stack: ['A']
      }
    },
    {
      explanation: "Visit node A and mark it as visited. Push all of A's unvisited neighbors (B and C) onto the stack. Since DFS follows a depth-first approach, we'll explore B first.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => 
          node.id === 'A' ? { ...node, state: 'current' as NodeState } : node
        ),
        edges: createSampleGraph().edges
      },
      variables: {
        visited: ['A'],
        stack: ['C', 'B']
      }
    },
    {
      explanation: "Visit node B and mark it as visited. Push B's unvisited neighbor (D) onto the stack.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => 
          node.id === 'A' ? { ...node, state: 'visited' as NodeState } : 
          node.id === 'B' ? { ...node, state: 'current' as NodeState } : node
        ),
        edges: createSampleGraph().edges
      },
      variables: {
        visited: ['A', 'B'],
        stack: ['C', 'D']
      }
    },
    {
      explanation: "Visit node D and mark it as visited. Push D's unvisited neighbors (E and F) onto the stack.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => 
          node.id === 'A' || node.id === 'B' ? { ...node, state: 'visited' as NodeState } : 
          node.id === 'D' ? { ...node, state: 'current' as NodeState } : node
        ),
        edges: createSampleGraph().edges
      },
      variables: {
        visited: ['A', 'B', 'D'],
        stack: ['C', 'F', 'E']
      }
    },
    {
      explanation: "Visit node E and mark it as visited. E has no unvisited neighbors.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => 
          node.id === 'A' || node.id === 'B' || node.id === 'D' ? { ...node, state: 'visited' as NodeState } : 
          node.id === 'E' ? { ...node, state: 'current' as NodeState } : node
        ),
        edges: createSampleGraph().edges
      },
      variables: {
        visited: ['A', 'B', 'D', 'E'],
        stack: ['C', 'F']
      }
    },
    {
      explanation: "Visit node F and mark it as visited. F has no unvisited neighbors.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => 
          node.id === 'A' || node.id === 'B' || node.id === 'D' || node.id === 'E' ? { ...node, state: 'visited' as NodeState } : 
          node.id === 'F' ? { ...node, state: 'current' as NodeState } : node
        ),
        edges: createSampleGraph().edges
      },
      variables: {
        visited: ['A', 'B', 'D', 'E', 'F'],
        stack: ['C']
      }
    },
    {
      explanation: "Visit node C and mark it as visited. C's neighbor (D) is already visited, so we don't revisit it.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => 
          node.id === 'A' || node.id === 'B' || node.id === 'D' || node.id === 'E' || node.id === 'F' ? { ...node, state: 'visited' as NodeState } : 
          node.id === 'C' ? { ...node, state: 'current' as NodeState } : node
        ),
        edges: createSampleGraph().edges
      },
      variables: {
        visited: ['A', 'B', 'D', 'E', 'F', 'C'],
        stack: []
      }
    },
    {
      explanation: "The stack is now empty, and all nodes have been visited. The DFS traversal is complete: A -> B -> D -> E -> F -> C.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => ({ ...node, state: 'visited' as NodeState })),
        edges: createSampleGraph().edges
      },
      variables: {
        visited: ['A', 'B', 'D', 'E', 'F', 'C'],
        stack: []
      }
    }
  ]
};
