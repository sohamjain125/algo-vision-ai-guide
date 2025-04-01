
import { Algorithm } from '@/types/AlgorithmTypes';
import { binarySearch } from '@/data/algorithms/binary-search';
import { bubbleSort } from '@/data/algorithms/bubble-sort';
import { quickSort } from '@/data/algorithms/quick-sort';
import { binarySearchTree } from '@/data/algorithms/binary-search-tree';
import { breadthFirstSearch } from '@/data/algorithms/breadth-first-search';
import { heapSort } from '@/data/algorithms/heap-sort';
import { mergeSort } from '@/data/algorithms/merge-sort';
import { linkedList } from '@/data/algorithms/linked-list';

// All available algorithms
const algorithms: Algorithm[] = [
  binarySearch,
  bubbleSort,
  quickSort,
  binarySearchTree,
  breadthFirstSearch,
  heapSort,
  mergeSort,
  linkedList
];

// Keywords associated with each algorithm
const algorithmKeywords: Record<string, string[]> = {
  'binary-search': ['binary search', 'binary', 'search', 'find element', 'logarithmic search'],
  'bubble-sort': ['bubble sort', 'bubble', 'sorting', 'swap'],
  'quick-sort': ['quick sort', 'quicksort', 'partition', 'pivoting', 'divide and conquer'],
  'binary-search-tree': ['binary search tree', 'bst', 'tree', 'binary tree'],
  'breadth-first-search': ['bfs', 'breadth first search', 'level order', 'graph traversal', 'breadth'],
  'heap-sort': ['heap sort', 'heapsort', 'heap', 'binary heap', 'max heap', 'priority queue'],
  'merge-sort': ['merge sort', 'mergesort', 'merge', 'divide and conquer', 'stable sort'],
  'linked-list': ['linked list', 'list', 'node', 'linked', 'singly linked', 'chain']
};

export function getAlgorithmByQuery(query: string): Algorithm | null {
  const normalizedQuery = query.toLowerCase();
  
  // Score each algorithm based on keyword matches
  const algorithmScores = algorithms.map(algorithm => {
    const keywords = algorithmKeywords[algorithm.id] || [];
    
    let score = 0;
    
    // Check for exact algorithm name match
    if (normalizedQuery.includes(algorithm.name.toLowerCase())) {
      score += 10;
    }
    
    // Check for keyword matches
    for (const keyword of keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        score += 5;
      }
    }
    
    return { algorithm, score };
  });
  
  // Sort by score
  algorithmScores.sort((a, b) => b.score - a.score);
  
  // Return the highest scoring algorithm, if it has any matches
  return algorithmScores[0]?.score > 0 ? algorithmScores[0].algorithm : null;
}
