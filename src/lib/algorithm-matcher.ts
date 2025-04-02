
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
  'binary-search': ['binary search', 'binary', 'search', 'find element', 'logarithmic search', 'efficient search', 'sorted array search'],
  'bubble-sort': ['bubble sort', 'bubble', 'sorting', 'swap', 'simple sort', 'adjacent comparison', 'element swapping'],
  'quick-sort': ['quick sort', 'quicksort', 'partition', 'pivoting', 'divide and conquer', 'efficient sorting', 'pivot-based', 'recursive sort'],
  'binary-search-tree': ['binary search tree', 'bst', 'tree', 'binary tree', 'search tree', 'hierarchical', 'ordered tree'],
  'breadth-first-search': ['bfs', 'breadth first search', 'level order', 'graph traversal', 'breadth', 'width-first', 'level traversal', 'queue-based search'],
  'heap-sort': ['heap sort', 'heapsort', 'heap', 'binary heap', 'max heap', 'priority queue', 'heap-based sorting', 'tree sort'],
  'merge-sort': ['merge sort', 'mergesort', 'merge', 'divide and conquer', 'stable sort', 'recursive sorting', 'divide-merge', 'n log n sort'],
  'linked-list': ['linked list', 'list', 'node', 'linked', 'singly linked', 'chain', 'sequential access', 'node chain', 'pointer-based']
};

// Algorithm comparison keywords
const comparisonKeywords = ['compare', 'comparison', 'versus', 'vs', 'difference', 'better', 'faster', 'efficient', 'which is'];

/**
 * Enhanced algorithm matcher that can identify:
 * 1. Single algorithm queries
 * 2. Algorithm comparison queries
 * 3. More resilient to different phrasings
 */
export function getAlgorithmByQuery(query: string): Algorithm | null {
  const normalizedQuery = query.toLowerCase();
  
  // Check if this is a comparison query
  const isComparisonQuery = comparisonKeywords.some(keyword => normalizedQuery.includes(keyword));
  
  if (isComparisonQuery) {
    return handleComparisonQuery(normalizedQuery);
  }
  
  // Score each algorithm based on keyword matches
  const algorithmScores = algorithms.map(algorithm => {
    const keywords = algorithmKeywords[algorithm.id] || [];
    
    let score = 0;
    
    // Check for exact algorithm name match
    if (normalizedQuery.includes(algorithm.name.toLowerCase())) {
      score += 10;
    }
    
    // Check for keyword matches with improved scoring
    for (const keyword of keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        // Give higher score to more specific keywords
        score += keyword.length > 5 ? 6 : 4;
      }
    }
    
    // Fuzzy matching for misspelled words
    for (const keyword of keywords) {
      if (fuzzyMatch(normalizedQuery, keyword.toLowerCase())) {
        score += 3;
      }
    }
    
    return { algorithm, score };
  });
  
  // Sort by score
  algorithmScores.sort((a, b) => b.score - a.score);
  
  // Return the highest scoring algorithm, if it has any matches
  return algorithmScores[0]?.score > 0 ? algorithmScores[0].algorithm : null;
}

/**
 * Handle comparison queries by finding the two most relevant algorithms
 */
function handleComparisonQuery(query: string): Algorithm | null {
  // Get the top two matching algorithms
  const scores = algorithms.map(algorithm => {
    const keywords = algorithmKeywords[algorithm.id] || [];
    let score = 0;
    
    if (query.includes(algorithm.name.toLowerCase())) {
      score += 10;
    }
    
    for (const keyword of keywords) {
      if (query.includes(keyword.toLowerCase())) {
        score += 5;
      }
    }
    
    return { algorithm, score };
  });
  
  scores.sort((a, b) => b.score - a.score);
  
  // If we have at least two algorithms with a score > 0, return the highest
  if (scores[0]?.score > 0 && scores[1]?.score > 0) {
    return scores[0].algorithm;
  }
  
  return scores[0]?.score > 0 ? scores[0].algorithm : null;
}

/**
 * Simple fuzzy matching for handling misspellings
 */
function fuzzyMatch(text: string, pattern: string): boolean {
  // Allow for some misspellings by checking if most characters are present
  let matches = 0;
  const threshold = pattern.length * 0.7; // 70% of characters must match
  
  for (const char of pattern) {
    if (text.includes(char)) {
      matches++;
    }
  }
  
  return matches >= threshold;
}

/**
 * Get algorithms for comparison based on query
 */
export function getAlgorithmsForComparison(query: string): Algorithm[] {
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
  
  // Return the top two scoring algorithms, if they have any matches
  const results = algorithmScores.filter(item => item.score > 0).map(item => item.algorithm);
  return results.slice(0, 2);
}
