
import { Algorithm } from '@/types/AlgorithmTypes';

export const quickSort: Algorithm = {
  id: 'quick-sort',
  name: 'Quick Sort',
  category: 'sorting',
  description: 'An efficient divide-and-conquer sorting algorithm that works by selecting a pivot element and partitioning the array around it.',
  timeComplexity: 'O(n log n) average, O(n²) worst case',
  spaceComplexity: 'O(log n)',
  code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort the sub-arrays
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}

function partition(arr, low, high) {
  // Choose the rightmost element as pivot
  const pivot = arr[high];
  
  // Index of smaller element
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    // If current element is smaller than pivot
    if (arr[j] < pivot) {
      i++;
      // Swap elements
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Place pivot in its correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  // Return the pivot's index
  return i + 1;
}`,
  steps: [
    {
      explanation: "We start with an unsorted array. Quick sort works by selecting a pivot element and partitioning the array around it.",
      array: [
        { value: 10, state: 'default' },
        { value: 80, state: 'default' },
        { value: 30, state: 'default' },
        { value: 90, state: 'default' },
        { value: 40, state: 'default' },
        { value: 50, state: 'default' },
        { value: 70, state: 'default' },
      ],
      variables: {
        low: 0,
        high: 6
      }
    },
    {
      explanation: "We choose the rightmost element (70) as the pivot for the first partition.",
      array: [
        { value: 10, state: 'default' },
        { value: 80, state: 'default' },
        { value: 30, state: 'default' },
        { value: 90, state: 'default' },
        { value: 40, state: 'default' },
        { value: 50, state: 'default' },
        { value: 70, state: 'highlighted' },
      ],
      variables: {
        low: 0,
        high: 6,
        pivot: 70,
        i: -1,
        j: 0
      }
    },
    {
      explanation: "We compare each element with the pivot. If it's less than the pivot, we increment i and swap arr[i] with the current element. First element (10) is less than pivot (70).",
      array: [
        { value: 10, state: 'current' },
        { value: 80, state: 'default' },
        { value: 30, state: 'default' },
        { value: 90, state: 'default' },
        { value: 40, state: 'default' },
        { value: 50, state: 'default' },
        { value: 70, state: 'highlighted' },
      ],
      variables: {
        low: 0,
        high: 6,
        pivot: 70,
        i: 0,
        j: 1
      }
    },
    {
      explanation: "Second element (80) is greater than pivot (70), so we don't swap.",
      array: [
        { value: 10, state: 'visited' },
        { value: 80, state: 'current' },
        { value: 30, state: 'default' },
        { value: 90, state: 'default' },
        { value: 40, state: 'default' },
        { value: 50, state: 'default' },
        { value: 70, state: 'highlighted' },
      ],
      variables: {
        low: 0,
        high: 6,
        pivot: 70,
        i: 0,
        j: 2
      }
    },
    {
      explanation: "After processing the entire array, we place the pivot in its correct position (between smaller and larger elements).",
      array: [
        { value: 10, state: 'visited' },
        { value: 30, state: 'visited' },
        { value: 40, state: 'visited' },
        { value: 50, state: 'visited' },
        { value: 70, state: 'highlighted' },
        { value: 90, state: 'visited' },
        { value: 80, state: 'visited' },
      ],
      variables: {
        pivotIndex: 4
      }
    },
    {
      explanation: "We recursively apply the same process to the sub-arrays before and after the pivot. After multiple partitions and recursion, the array becomes sorted.",
      array: [
        { value: 10, state: 'highlighted' },
        { value: 30, state: 'highlighted' },
        { value: 40, state: 'highlighted' },
        { value: 50, state: 'highlighted' },
        { value: 70, state: 'highlighted' },
        { value: 80, state: 'highlighted' },
        { value: 90, state: 'highlighted' },
      ]
    }
  ]
};
