
import { Algorithm, ArrayElement } from '@/types/AlgorithmTypes';

export const bubbleSort: Algorithm = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  category: 'sorting',
  description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  code: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    // Flag to optimize if no swaps occur in a pass
    let swapped = false;
    
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap them
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred in this pass, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}`,
  steps: [
    {
      explanation: "We start with an unsorted array. Bubble sort works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order.",
      array: [
        { value: 64, state: 'default' },
        { value: 34, state: 'default' },
        { value: 25, state: 'default' },
        { value: 12, state: 'default' },
        { value: 22, state: 'default' },
        { value: 11, state: 'default' },
        { value: 90, state: 'default' },
      ],
      variables: {
        n: 7,
        i: 0,
        j: 0,
        swapped: false
      }
    },
    {
      explanation: "Compare the first two elements (64 and 34). Since 64 > 34, we swap them.",
      array: [
        { value: 64, state: 'current' },
        { value: 34, state: 'current' },
        { value: 25, state: 'default' },
        { value: 12, state: 'default' },
        { value: 22, state: 'default' },
        { value: 11, state: 'default' },
        { value: 90, state: 'default' },
      ],
      variables: {
        n: 7,
        i: 0,
        j: 0,
        swapped: false
      }
    },
    {
      explanation: "After swapping, we move to the next pair (64 and 25).",
      array: [
        { value: 34, state: 'visited' },
        { value: 64, state: 'current' },
        { value: 25, state: 'current' },
        { value: 12, state: 'default' },
        { value: 22, state: 'default' },
        { value: 11, state: 'default' },
        { value: 90, state: 'default' },
      ],
      variables: {
        n: 7,
        i: 0,
        j: 1,
        swapped: true
      }
    },
    {
      explanation: "64 > 25, so we swap them.",
      array: [
        { value: 34, state: 'visited' },
        { value: 25, state: 'visited' },
        { value: 64, state: 'current' },
        { value: 12, state: 'current' },
        { value: 22, state: 'default' },
        { value: 11, state: 'default' },
        { value: 90, state: 'default' },
      ],
      variables: {
        n: 7,
        i: 0,
        j: 2,
        swapped: true
      }
    },
    {
      explanation: "64 > 12, so we swap them. Notice how the largest element (64) is moving toward the end of the array.",
      array: [
        { value: 34, state: 'visited' },
        { value: 25, state: 'visited' },
        { value: 12, state: 'visited' },
        { value: 64, state: 'current' },
        { value: 22, state: 'current' },
        { value: 11, state: 'default' },
        { value: 90, state: 'default' },
      ],
      variables: {
        n: 7,
        i: 0,
        j: 3,
        swapped: true
      }
    },
    {
      explanation: "64 > 22, so we swap them.",
      array: [
        { value: 34, state: 'visited' },
        { value: 25, state: 'visited' },
        { value: 12, state: 'visited' },
        { value: 22, state: 'visited' },
        { value: 64, state: 'current' },
        { value: 11, state: 'current' },
        { value: 90, state: 'default' },
      ],
      variables: {
        n: 7,
        i: 0,
        j: 4,
        swapped: true
      }
    },
    {
      explanation: "64 > 11, so we swap them.",
      array: [
        { value: 34, state: 'visited' },
        { value: 25, state: 'visited' },
        { value: 12, state: 'visited' },
        { value: 22, state: 'visited' },
        { value: 11, state: 'visited' },
        { value: 64, state: 'current' },
        { value: 90, state: 'current' },
      ],
      variables: {
        n: 7,
        i: 0,
        j: 5,
        swapped: true
      }
    },
    {
      explanation: "64 < 90, so we don't swap them. The first pass is complete, and the largest element (90) is at the end of the array.",
      array: [
        { value: 34, state: 'visited' },
        { value: 25, state: 'visited' },
        { value: 12, state: 'visited' },
        { value: 22, state: 'visited' },
        { value: 11, state: 'visited' },
        { value: 64, state: 'visited' },
        { value: 90, state: 'highlighted' },
      ],
      variables: {
        n: 7,
        i: 1,
        j: 0,
        swapped: true
      }
    },
    {
      explanation: "We continue with the second pass, but now we only need to go up to the second-to-last element. We compare 34 and 25.",
      array: [
        { value: 34, state: 'current' },
        { value: 25, state: 'current' },
        { value: 12, state: 'default' },
        { value: 22, state: 'default' },
        { value: 11, state: 'default' },
        { value: 64, state: 'default' },
        { value: 90, state: 'highlighted' },
      ],
      variables: {
        n: 7,
        i: 1,
        j: 0,
        swapped: false
      }
    },
    {
      explanation: "After several passes and swaps, the array is sorted in ascending order.",
      array: [
        { value: 11, state: 'highlighted' },
        { value: 12, state: 'highlighted' },
        { value: 22, state: 'highlighted' },
        { value: 25, state: 'highlighted' },
        { value: 34, state: 'highlighted' },
        { value: 64, state: 'highlighted' },
        { value: 90, state: 'highlighted' },
      ],
      variables: {
        n: 7,
        i: 6,
        j: 0,
        swapped: false
      }
    }
  ]
};
