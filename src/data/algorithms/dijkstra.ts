
import { Algorithm } from '@/types/AlgorithmTypes';

// Create a sample weighted graph for Dijkstra visualization
const createSampleGraph = () => {
  const nodes = [
    { id: 'A', value: 'A', state: 'default', x: 100, y: 100 },
    { id: 'B', value: 'B', state: 'default', x: 200, y: 50 },
    { id: 'C', value: 'C', state: 'default', x: 200, y: 150 },
    { id: 'D', value: 'D', state: 'default', x: 300, y: 100 },
    { id: 'E', value: 'E', state: 'default', x: 400, y: 50 },
    { id: 'F', value: 'F', state: 'default', x: 400, y: 150 }
  ];
  
  const edges = [
    { source: 'A', target: 'B', weight: 4 },
    { source: 'A', target: 'C', weight: 2 },
    { source: 'B', target: 'D', weight: 5 },
    { source: 'C', target: 'D', weight: 1 },
    { source: 'D', target: 'E', weight: 3 },
    { source: 'D', target: 'F', weight: 6 },
    { source: 'E', target: 'F', weight: 2 }
  ];
  
  return { nodes, edges };
};

export const dijkstra: Algorithm = {
  id: 'dijkstra',
  name: 'Dijkstra\'s Algorithm',
  category: 'graph',
  description: 'A greedy algorithm that finds the shortest path from a source node to all other nodes in a weighted graph.',
  timeComplexity: 'O((V + E) log V) with binary heap, where V is the number of vertices and E is the number of edges',
  spaceComplexity: 'O(V) for storing distances and visited nodes',
  code: `function dijkstra(graph, startNode) {
  // Initialize distances with Infinity for all nodes except start node
  const distances = {};
  const previous = {};
  const nodes = new Set();
  
  // Initialize all nodes with infinite distance
  for (const node in graph) {
    distances[node] = node === startNode ? 0 : Infinity;
    previous[node] = null;
    nodes.add(node);
  }
  
  // Main algorithm loop
  while (nodes.size > 0) {
    // Find node with minimum distance
    let minNode = null;
    for (const node of nodes) {
      if (minNode === null || distances[node] < distances[minNode]) {
        minNode = node;
      }
    }
    
    // Remove node from unvisited set
    nodes.delete(minNode);
    
    // If distance is infinity, remaining nodes are unreachable
    if (distances[minNode] === Infinity) break;
    
    // Update distances to neighbors
    for (const [neighbor, weight] of Object.entries(graph[minNode])) {
      const distance = distances[minNode] + weight;
      
      // If we found a shorter path to the neighbor
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = minNode;
      }
    }
  }
  
  return { distances, previous };
}

// Example usage:
const graph = {
  'A': { 'B': 4, 'C': 2 },
  'B': { 'D': 5 },
  'C': { 'D': 1 },
  'D': { 'E': 3, 'F': 6 },
  'E': { 'F': 2 },
  'F': {}
};

const { distances, previous } = dijkstra(graph, 'A');
console.log('Distances:', distances);
console.log('Previous:', previous);`,
  pseudocode: `Dijkstra(Graph, source):
  create vertex set Q
  
  for each vertex v in Graph:
    dist[v] ← INFINITY
    prev[v] ← UNDEFINED
    add v to Q
  dist[source] ← 0
  
  while Q is not empty:
    u ← vertex in Q with min dist[u]
    remove u from Q
    
    for each neighbor v of u:
      alt ← dist[u] + length(u, v)
      if alt < dist[v]:
        dist[v] ← alt
        prev[v] ← u
  
  return dist[], prev[]`,
  steps: [
    {
      explanation: "We start with a weighted graph. We'll find the shortest paths from node A to all other nodes.",
      graph: {
        nodes: createSampleGraph().nodes,
        edges: createSampleGraph().edges
      },
      variables: {
        distances: { A: 0, B: "∞", C: "∞", D: "∞", E: "∞", F: "∞" },
        visited: []
      }
    },
    {
      explanation: "Visit node A (the source) and calculate distances to its neighbors: A→B (4) and A→C (2). Mark A as visited.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => 
          node.id === 'A' ? { ...node, state: 'current' } : node
        ),
        edges: createSampleGraph().edges
      },
      variables: {
        distances: { A: 0, B: 4, C: 2, D: "∞", E: "∞", F: "∞" },
        visited: ['A']
      }
    },
    {
      explanation: "The closest unvisited node is C (distance 2). Visit C and calculate distances through C: C→D = 2+1 = 3. Mark C as visited.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => 
          node.id === 'A' ? { ...node, state: 'visited' } : 
          node.id === 'C' ? { ...node, state: 'current' } : node
        ),
        edges: createSampleGraph().edges
      },
      variables: {
        distances: { A: 0, B: 4, C: 2, D: 3, E: "∞", F: "∞" },
        visited: ['A', 'C']
      }
    },
    {
      explanation: "The closest unvisited node is B (distance 4). Visit B and calculate distances through B: B→D = 4+5 = 9, but we already have a shorter path to D (3). Mark B as visited.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => 
          node.id === 'A' || node.id === 'C' ? { ...node, state: 'visited' } : 
          node.id === 'B' ? { ...node, state: 'current' } : node
        ),
        edges: createSampleGraph().edges
      },
      variables: {
        distances: { A: 0, B: 4, C: 2, D: 3, E: "∞", F: "∞" },
        visited: ['A', 'C', 'B']
      }
    },
    {
      explanation: "The closest unvisited node is D (distance 3). Visit D and calculate distances through D: D→E = 3+3 = 6, D→F = 3+6 = 9. Mark D as visited.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => 
          node.id === 'A' || node.id === 'C' || node.id === 'B' ? { ...node, state: 'visited' } : 
          node.id === 'D' ? { ...node, state: 'current' } : node
        ),
        edges: createSampleGraph().edges
      },
      variables: {
        distances: { A: 0, B: 4, C: 2, D: 3, E: 6, F: 9 },
        visited: ['A', 'C', 'B', 'D']
      }
    },
    {
      explanation: "The closest unvisited node is E (distance 6). Visit E and calculate distances through E: E→F = 6+2 = 8, which is better than our current path to F (9). Update F's distance. Mark E as visited.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => 
          node.id === 'A' || node.id === 'C' || node.id === 'B' || node.id === 'D' ? { ...node, state: 'visited' } : 
          node.id === 'E' ? { ...node, state: 'current' } : node
        ),
        edges: createSampleGraph().edges
      },
      variables: {
        distances: { A: 0, B: 4, C: 2, D: 3, E: 6, F: 8 },
        visited: ['A', 'C', 'B', 'D', 'E']
      }
    },
    {
      explanation: "The last unvisited node is F (distance 8). Visit F and mark it as visited. All nodes have been visited.",
      graph: {
        nodes: createSampleGraph().nodes.map(node => 
          node.id === 'A' || node.id === 'C' || node.id === 'B' || node.id === 'D' || node.id === 'E' ? { ...node, state: 'visited' } : 
          node.id === 'F' ? { ...node, state: 'current' } : node
        ),
        edges: createSampleGraph().edges
      },
      variables: {
        distances: { A: 0, B: 4, C: 2, D: 3, E: 6, F: 8 },
        visited: ['A', 'C', 'B', 'D', 'E', 'F']
      }
    },
    {
      explanation: "Dijkstra's algorithm is complete. We've found the shortest path from A to every other node: A→B (4), A→C (2), A→C→D (3), A→C→D→E (6), A→C→D→E→F (8).",
      graph: {
        nodes: createSampleGraph().nodes.map(node => ({ ...node, state: 'visited' })),
        edges: createSampleGraph().edges
      },
      variables: {
        distances: { A: 0, B: 4, C: 2, D: 3, E: 6, F: 8 },
        shortestPaths: {
          'B': 'A → B (4)',
          'C': 'A → C (2)',
          'D': 'A → C → D (3)',
          'E': 'A → C → D → E (6)',
          'F': 'A → C → D → E → F (8)'
        }
      }
    }
  ]
};
