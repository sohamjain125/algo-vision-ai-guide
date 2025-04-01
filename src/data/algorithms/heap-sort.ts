
import { Algorithm } from '@/types/AlgorithmTypes';

export const heapSort: Algorithm = {
  id: 'heap-sort',
  name: 'Heap Sort',
  category: 'sorting',
  description: 'A comparison-based sorting algorithm that uses a binary heap data structure to build a max-heap and then repeatedly extracts the maximum element to create a sorted array.',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(1)',
  code: `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;      // Initialize largest as root
  const left = 2 * i + 1;  // Left child
  const right = 2 * i + 2; // Right child
  
  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}`,
  steps: [
    {
      explanation: "Heap sort works by first building a max heap from the array, then repeatedly extracting the maximum element. Let's start with an unsorted array.",
      array: [
        { value: 12, state: 'default' },
        { value: 11, state: 'default' },
        { value: 13, state: 'default' },
        { value: 5, state: 'default' },
        { value: 6, state: 'default' },
        { value: 7, state: 'default' },
      ],
      variables: {
        n: 6
      }
    },
    {
      explanation: "First, we need to build a max heap. We start from the last non-leaf node (n/2 - 1) and work our way up. We call heapify on each node.",
      array: [
        { value: 12, state: 'default' },
        { value: 11, state: 'default' },
        { value: 13, state: 'current' },
        { value: 5, state: 'default' },
        { value: 6, state: 'default' },
        { value: 7, state: 'default' },
      ],
      variables: {
        n: 6,
        i: 2,
        largest: 2
      }
    },
    {
      explanation: "Heapify compares the current node with its children. If a child is larger, it becomes the largest. Here 13 is already the largest, so we don't make any changes.",
      array: [
        { value: 12, state: 'default' },
        { value: 11, state: 'current' },
        { value: 13, state: 'visited' },
        { value: 5, state: 'default' },
        { value: 6, state: 'default' },
        { value: 7, state: 'default' },
      ],
      variables: {
        n: 6,
        i: 1,
        largest: 1
      }
    },
    {
      explanation: "Node 11 has children 5 and 6. None are larger than 11, so we don't make any changes.",
      array: [
        { value: 12, state: 'current' },
        { value: 11, state: 'visited' },
        { value: 13, state: 'visited' },
        { value: 5, state: 'default' },
        { value: 6, state: 'default' },
        { value: 7, state: 'default' },
      ],
      variables: {
        n: 6,
        i: 0,
        largest: 0
      }
    },
    {
      explanation: "Node 12 has children 11 and 13. Since 13 > 12, we swap them. After the swap, we recursively heapify the affected subtree.",
      array: [
        { value: 13, state: 'current' },
        { value: 11, state: 'visited' },
        { value: 12, state: 'current' },
        { value: 5, state: 'default' },
        { value: 6, state: 'default' },
        { value: 7, state: 'default' },
      ],
      variables: {
        n: 6,
        i: 0,
        largest: 2
      }
    },
    {
      explanation: "Now our array is a max heap, with the largest element at the root. In a max heap, each parent node is greater than or equal to its children.",
      array: [
        { value: 13, state: 'highlighted' },
        { value: 11, state: 'default' },
        { value: 12, state: 'default' },
        { value: 5, state: 'default' },
        { value: 6, state: 'default' },
        { value: 7, state: 'default' },
      ],
      variables: {
        n: 6
      }
    },
    {
      explanation: "Next, we extract the max element by swapping it with the last element in the heap, then reduce the heap size by 1 and heapify the root.",
      array: [
        { value: 7, state: 'current' },
        { value: 11, state: 'default' },
        { value: 12, state: 'default' },
        { value: 5, state: 'default' },
        { value: 6, state: 'default' },
        { value: 13, state: 'highlighted' },
      ],
      variables: {
        n: 5,
        i: 0
      }
    },
    {
      explanation: "After several steps of extracting the max and heapifying, the array becomes sorted in ascending order.",
      array: [
        { value: 5, state: 'highlighted' },
        { value: 6, state: 'highlighted' },
        { value: 7, state: 'highlighted' },
        { value: 11, state: 'highlighted' },
        { value: 12, state: 'highlighted' },
        { value: 13, state: 'highlighted' },
      ],
      variables: {
        n: 0
      }
    }
  ]
};
