
import { Algorithm } from '@/types/AlgorithmTypes';

export const insertionSort: Algorithm = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  category: 'sorting',
  description: 'A simple sorting algorithm that builds the final sorted array one item at a time by comparing each with previous elements.',
  timeComplexity: 'O(n²) for the worst and average case, O(n) for the best case (already sorted array)',
  spaceComplexity: 'O(1) as it sorts in-place',
  code: `function insertionSort(arr) {
  // Start from the second element (index 1)
  for (let i = 1; i < arr.length; i++) {
    // Save the current element to insert
    let currentElement = arr[i];
    
    // Start comparison with previous element
    let j = i - 1;
    
    // Move elements of arr[0..i-1] that are greater than currentElement
    // to one position ahead of their current position
    while (j >= 0 && arr[j] > currentElement) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert the saved element at the right position
    arr[j + 1] = currentElement;
  }
  
  return arr;
}

// Example usage:
const array = [12, 11, 13, 5, 6];
console.log(insertionSort(array)); // [5, 6, 11, 12, 13]`,
  pseudocode: `InsertionSort(A):
  for i = 1 to A.length - 1
    key = A[i]
    // Insert A[i] into the sorted sequence A[0...i-1]
    j = i - 1
    while j >= 0 and A[j] > key
      A[j+1] = A[j]
      j = j - 1
    A[j+1] = key
  return A`,
  steps: [
    {
      explanation: "We start with an unsorted array [12, 11, 13, 5, 6].",
      array: [
        { value: 12, state: 'default' },
        { value: 11, state: 'default' },
        { value: 13, state: 'default' },
        { value: 5, state: 'default' },
        { value: 6, state: 'default' }
      ],
      variables: {
        currentElement: null,
        i: 0,
        j: -1
      }
    },
    {
      explanation: "At the beginning, we consider the first element [12] as sorted. Start with i=1, currentElement=11.",
      array: [
        { value: 12, state: 'visited' },
        { value: 11, state: 'current' },
        { value: 13, state: 'default' },
        { value: 5, state: 'default' },
        { value: 6, state: 'default' }
      ],
      variables: {
        currentElement: 11,
        i: 1,
        j: 0
      }
    },
    {
      explanation: "Compare currentElement (11) with the previous element (12). Since 11 < 12, shift 12 one position to the right and place 11 at index 0.",
      array: [
        { value: 11, state: 'current' },
        { value: 12, state: 'visited' },
        { value: 13, state: 'default' },
        { value: 5, state: 'default' },
        { value: 6, state: 'default' }
      ],
      variables: {
        currentElement: 11,
        i: 1,
        j: -1
      }
    },
    {
      explanation: "Move to i=2, currentElement=13. Compare with previous elements 11 and 12. Since 13 > 12, no shifts needed.",
      array: [
        { value: 11, state: 'visited' },
        { value: 12, state: 'visited' },
        { value: 13, state: 'current' },
        { value: 5, state: 'default' },
        { value: 6, state: 'default' }
      ],
      variables: {
        currentElement: 13,
        i: 2,
        j: 1
      }
    },
    {
      explanation: "Move to i=3, currentElement=5. Compare with previous elements. Since 5 < 13, 5 < 12, and 5 < 11, shift all elements to the right.",
      array: [
        { value: 5, state: 'current' },
        { value: 11, state: 'visited' },
        { value: 12, state: 'visited' },
        { value: 13, state: 'visited' },
        { value: 6, state: 'default' }
      ],
      variables: {
        currentElement: 5,
        i: 3,
        j: -1
      },
      pointers: {
        i: 3
      }
    },
    {
      explanation: "Move to i=4, currentElement=6. Compare with previous elements. Since 6 > 5 but 6 < 11, shift 11, 12, 13 to the right and place 6 after 5.",
      array: [
        { value: 5, state: 'visited' },
        { value: 6, state: 'current' },
        { value: 11, state: 'visited' },
        { value: 12, state: 'visited' },
        { value: 13, state: 'visited' }
      ],
      variables: {
        currentElement: 6,
        i: 4,
        j: 0
      },
      pointers: {
        i: 4
      }
    },
    {
      explanation: "All elements have been processed. The array is now sorted in ascending order: [5, 6, 11, 12, 13].",
      array: [
        { value: 5, state: 'visited' },
        { value: 6, state: 'visited' },
        { value: 11, state: 'visited' },
        { value: 12, state: 'visited' },
        { value: 13, state: 'visited' }
      ],
      variables: {
        sorted: true
      }
    }
  ]
};
