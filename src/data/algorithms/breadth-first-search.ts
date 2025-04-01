
import { Algorithm } from '@/types/AlgorithmTypes';

export const breadthFirstSearch: Algorithm = {
  id: 'breadth-first-search',
  name: 'Breadth First Search',
  category: 'graph',
  description: 'A graph traversal algorithm that explores all vertices at the current depth level before moving to nodes at the next depth level.',
  timeComplexity: 'O(V + E) where V is the number of vertices and E is the number of edges',
  spaceComplexity: 'O(V)',
  code: `function breadthFirstSearch(graph, startNode) {
  // Create a queue for BFS
  const queue = [startNode];
  
  // Create a set to store visited vertices
  const visited = new Set();
  visited.add(startNode);
  
  // Result array to store traversal order
  const result = [];
  
  // While there are nodes in the queue
  while (queue.length) {
    // Dequeue a vertex from queue
    const currentNode = queue.shift();
    
    // Add to result
    result.push(currentNode);
    
    // Get all adjacent vertices of the dequeued vertex
    // If an adjacent node has not been visited, mark it
    // visited and enqueue it
    for (const neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}`,
  steps: [
    {
      explanation: "Breadth First Search (BFS) is a graph traversal algorithm. Let's visualize it on a simple graph. We'll start from node A.",
      graph: {
        nodes: [
          { id: 'A', value: 'A', state: 'current', x: 300, y: 100 },
          { id: 'B', value: 'B', state: 'default', x: 200, y: 200 },
          { id: 'C', value: 'C', state: 'default', x: 400, y: 200 },
          { id: 'D', value: 'D', state: 'default', x: 100, y: 300 },
          { id: 'E', value: 'E', state: 'default', x: 300, y: 300 },
          { id: 'F', value: 'F', state: 'default', x: 500, y: 300 }
        ],
        edges: [
          { source: 'A', target: 'B' },
          { source: 'A', target: 'C' },
          { source: 'B', target: 'D' },
          { source: 'B', target: 'E' },
          { source: 'C', target: 'E' },
          { source: 'C', target: 'F' }
        ]
      },
      variables: {
        queue: ['A'],
        visited: ['A'],
        result: []
      }
    },
    {
      explanation: "We dequeue node A and add it to our result. Then we visit all of A's neighbors (B and C) and add them to the queue if they haven't been visited already.",
      graph: {
        nodes: [
          { id: 'A', value: 'A', state: 'visited', x: 300, y: 100 },
          { id: 'B', value: 'B', state: 'current', x: 200, y: 200 },
          { id: 'C', value: 'C', state: 'current', x: 400, y: 200 },
          { id: 'D', value: 'D', state: 'default', x: 100, y: 300 },
          { id: 'E', value: 'E', state: 'default', x: 300, y: 300 },
          { id: 'F', value: 'F', state: 'default', x: 500, y: 300 }
        ],
        edges: [
          { source: 'A', target: 'B' },
          { source: 'A', target: 'C' },
          { source: 'B', target: 'D' },
          { source: 'B', target: 'E' },
          { source: 'C', target: 'E' },
          { source: 'C', target: 'F' }
        ]
      },
      variables: {
        queue: ['B', 'C'],
        visited: ['A', 'B', 'C'],
        result: ['A']
      }
    },
    {
      explanation: "We dequeue node B and add it to our result. Then we visit all of B's neighbors (D and E) and add them to the queue if they haven't been visited already.",
      graph: {
        nodes: [
          { id: 'A', value: 'A', state: 'visited', x: 300, y: 100 },
          { id: 'B', value: 'B', state: 'visited', x: 200, y: 200 },
          { id: 'C', value: 'C', state: 'current', x: 400, y: 200 },
          { id: 'D', value: 'D', state: 'current', x: 100, y: 300 },
          { id: 'E', value: 'E', state: 'current', x: 300, y: 300 },
          { id: 'F', value: 'F', state: 'default', x: 500, y: 300 }
        ],
        edges: [
          { source: 'A', target: 'B' },
          { source: 'A', target: 'C' },
          { source: 'B', target: 'D' },
          { source: 'B', target: 'E' },
          { source: 'C', target: 'E' },
          { source: 'C', target: 'F' }
        ]
      },
      variables: {
        queue: ['C', 'D', 'E'],
        visited: ['A', 'B', 'C', 'D', 'E'],
        result: ['A', 'B']
      }
    },
    {
      explanation: "We dequeue node C and add it to our result. Then we visit all of C's neighbors (E and F) and add them to the queue if they haven't been visited already. Note that E is already visited, so we don't add it again.",
      graph: {
        nodes: [
          { id: 'A', value: 'A', state: 'visited', x: 300, y: 100 },
          { id: 'B', value: 'B', state: 'visited', x: 200, y: 200 },
          { id: 'C', value: 'C', state: 'visited', x: 400, y: 200 },
          { id: 'D', value: 'D', state: 'current', x: 100, y: 300 },
          { id: 'E', value: 'E', state: 'current', x: 300, y: 300 },
          { id: 'F', value: 'F', state: 'current', x: 500, y: 300 }
        ],
        edges: [
          { source: 'A', target: 'B' },
          { source: 'A', target: 'C' },
          { source: 'B', target: 'D' },
          { source: 'B', target: 'E' },
          { source: 'C', target: 'E' },
          { source: 'C', target: 'F' }
        ]
      },
      variables: {
        queue: ['D', 'E', 'F'],
        visited: ['A', 'B', 'C', 'D', 'E', 'F'],
        result: ['A', 'B', 'C']
      }
    },
    {
      explanation: "We continue the process, dequeuing D, E, and F one by one and visiting their neighbors (none of which have unvisited neighbors). After processing all nodes, our BFS traversal is complete.",
      graph: {
        nodes: [
          { id: 'A', value: 'A', state: 'visited', x: 300, y: 100 },
          { id: 'B', value: 'B', state: 'visited', x: 200, y: 200 },
          { id: 'C', value: 'C', state: 'visited', x: 400, y: 200 },
          { id: 'D', value: 'D', state: 'visited', x: 100, y: 300 },
          { id: 'E', value: 'E', state: 'visited', x: 300, y: 300 },
          { id: 'F', value: 'F', state: 'visited', x: 500, y: 300 }
        ],
        edges: [
          { source: 'A', target: 'B' },
          { source: 'A', target: 'C' },
          { source: 'B', target: 'D' },
          { source: 'B', target: 'E' },
          { source: 'C', target: 'E' },
          { source: 'C', target: 'F' }
        ]
      },
      variables: {
        queue: [],
        visited: ['A', 'B', 'C', 'D', 'E', 'F'],
        result: ['A', 'B', 'C', 'D', 'E', 'F']
      }
    },
    {
      explanation: "BFS traverses the graph level by level, exploring all neighbors of the current node before moving to the next level. This is useful for finding the shortest path in unweighted graphs and many other applications.",
      graph: {
        nodes: [
          { id: 'A', value: 'A', state: 'highlighted', x: 300, y: 100 },
          { id: 'B', value: 'B', state: 'highlighted', x: 200, y: 200 },
          { id: 'C', value: 'C', state: 'highlighted', x: 400, y: 200 },
          { id: 'D', value: 'D', state: 'highlighted', x: 100, y: 300 },
          { id: 'E', value: 'E', state: 'highlighted', x: 300, y: 300 },
          { id: 'F', value: 'F', state: 'highlighted', x: 500, y: 300 }
        ],
        edges: [
          { source: 'A', target: 'B' },
          { source: 'A', target: 'C' },
          { source: 'B', target: 'D' },
          { source: 'B', target: 'E' },
          { source: 'C', target: 'E' },
          { source: 'C', target: 'F' }
        ]
      }
    }
  ]
};
