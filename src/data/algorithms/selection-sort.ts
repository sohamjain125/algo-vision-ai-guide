
import { Algorithm } from '@/types/AlgorithmTypes';

export const selectionSort: Algorithm = {
  id: 'selection-sort',
  name: 'Selection Sort',
  category: 'sorting',
  description: 'A sorting algorithm that repeatedly finds the minimum element from the unsorted part and puts it at the beginning.',
  timeComplexity: 'O(n²) for all cases (best, average, worst)',
  spaceComplexity: 'O(1) as it sorts in-place',
  code: `function selectionSort(arr) {
  const n = arr.length;
  
  // Traverse through all array elements
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in the unsorted part
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      // If current element is smaller than min_idx element
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  
  return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log(selectionSort(array)); // [11, 12, 22, 25, 64]`,
  pseudocode: `SelectionSort(A):
  n = A.length
  for i = 0 to n-2
    // Find the minimum element in the unsorted part
    minIndex = i
    for j = i+1 to n-1
      if A[j] < A[minIndex]
        minIndex = j
    // Swap if minimum is not already at the correct position
    if minIndex != i
      swap A[i] with A[minIndex]
  return A`,
  steps: [
    {
      explanation: "We start with an unsorted array [64, 25, 12, 22, 11].",
      array: [
        { value: 64, state: 'default' },
        { value: 25, state: 'default' },
        { value: 12, state: 'default' },
        { value: 22, state: 'default' },
        { value: 11, state: 'default' }
      ],
      variables: {
        i: 0,
        minIndex: 0
      }
    },
    {
      explanation: "For i=0, find the minimum element in the whole array. The current minIndex=0 (value 64).",
      array: [
        { value: 64, state: 'current' },
        { value: 25, state: 'default' },
        { value: 12, state: 'default' },
        { value: 22, state: 'default' },
        { value: 11, state: 'default' }
      ],
      variables: {
        i: 0,
        minIndex: 0,
        j: 0
      }
    },
    {
      explanation: "Compare: 25 < 64, so minIndex=1 (value 25).",
      array: [
        { value: 64, state: 'default' },
        { value: 25, state: 'current' },
        { value: 12, state: 'default' },
        { value: 22, state: 'default' },
        { value: 11, state: 'default' }
      ],
      variables: {
        i: 0,
        minIndex: 1,
        j: 1
      }
    },
    {
      explanation: "Compare: 12 < 25, so minIndex=2 (value 12).",
      array: [
        { value: 64, state: 'default' },
        { value: 25, state: 'default' },
        { value: 12, state: 'current' },
        { value: 22, state: 'default' },
        { value: 11, state: 'default' }
      ],
      variables: {
        i: 0,
        minIndex: 2,
        j: 2
      }
    },
    {
      explanation: "Compare: 22 > 12, so minIndex remains 2.",
      array: [
        { value: 64, state: 'default' },
        { value: 25, state: 'default' },
        { value: 12, state: 'current' },
        { value: 22, state: 'default' },
        { value: 11, state: 'default' }
      ],
      variables: {
        i: 0,
        minIndex: 2,
        j: 3
      }
    },
    {
      explanation: "Compare: 11 < 12, so minIndex=4 (value 11).",
      array: [
        { value: 64, state: 'default' },
        { value: 25, state: 'default' },
        { value: 12, state: 'default' },
        { value: 22, state: 'default' },
        { value: 11, state: 'current' }
      ],
      variables: {
        i: 0,
        minIndex: 4,
        j: 4
      }
    },
    {
      explanation: "After scanning the whole array, the minimum value is 11 at index 4. Swap positions 0 and 4.",
      array: [
        { value: 11, state: 'visited' },
        { value: 25, state: 'default' },
        { value: 12, state: 'default' },
        { value: 22, state: 'default' },
        { value: 64, state: 'default' }
      ],
      variables: {
        i: 0,
        minIndex: 4,
        swap: true
      }
    },
    {
      explanation: "For i=1, find the minimum in the remaining unsorted part [25, 12, 22, 64]. The current minIndex=1 (value 25).",
      array: [
        { value: 11, state: 'visited' },
        { value: 25, state: 'current' },
        { value: 12, state: 'default' },
        { value: 22, state: 'default' },
        { value: 64, state: 'default' }
      ],
      variables: {
        i: 1,
        minIndex: 1,
        j: 1
      }
    },
    {
      explanation: "Compare: 12 < 25, so minIndex=2 (value 12).",
      array: [
        { value: 11, state: 'visited' },
        { value: 25, state: 'default' },
        { value: 12, state: 'current' },
        { value: 22, state: 'default' },
        { value: 64, state: 'default' }
      ],
      variables: {
        i: 1,
        minIndex: 2,
        j: 2
      }
    },
    {
      explanation: "After comparing all elements, the minimum value in the unsorted part is 12 at index 2. Swap positions 1 and 2.",
      array: [
        { value: 11, state: 'visited' },
        { value: 12, state: 'visited' },
        { value: 25, state: 'default' },
        { value: 22, state: 'default' },
        { value: 64, state: 'default' }
      ],
      variables: {
        i: 1,
        minIndex: 2,
        swap: true
      }
    },
    {
      explanation: "For i=2, find the minimum in the remaining unsorted part [25, 22, 64]. After comparing, the minimum is 22 at index 3. Swap positions 2 and 3.",
      array: [
        { value: 11, state: 'visited' },
        { value: 12, state: 'visited' },
        { value: 22, state: 'visited' },
        { value: 25, state: 'default' },
        { value: 64, state: 'default' }
      ],
      variables: {
        i: 2,
        minIndex: 3,
        swap: true
      }
    },
    {
      explanation: "For i=3, find the minimum in the remaining unsorted part [25, 64]. After comparing, the minimum is 25 at index 3. No swap needed.",
      array: [
        { value: 11, state: 'visited' },
        { value: 12, state: 'visited' },
        { value: 22, state: 'visited' },
        { value: 25, state: 'visited' },
        { value: 64, state: 'default' }
      ],
      variables: {
        i: 3,
        minIndex: 3,
        swap: false
      }
    },
    {
      explanation: "All iterations complete. The array is now sorted in ascending order: [11, 12, 22, 25, 64].",
      array: [
        { value: 11, state: 'visited' },
        { value: 12, state: 'visited' },
        { value: 22, state: 'visited' },
        { value: 25, state: 'visited' },
        { value: 64, state: 'visited' }
      ],
      variables: {
        sorted: true
      }
    }
  ]
};
