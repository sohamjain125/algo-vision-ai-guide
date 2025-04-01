
import { Algorithm } from '@/types/AlgorithmTypes';

export const mergeSort: Algorithm = {
  id: 'merge-sort',
  name: 'Merge Sort',
  category: 'sorting',
  description: 'A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and merges the sorted halves to produce a sorted array.',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(n)',
  code: `function mergeSort(arr) {
  // Base case: if array length is 1 or less, return array
  if (arr.length <= 1) return arr;
  
  // Find the middle index
  const mid = Math.floor(arr.length / 2);
  
  // Divide the array into left and right halves
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Recursively sort both halves
  return merge(
    mergeSort(left),
    mergeSort(right)
  );
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements from both arrays and add the smaller one to the result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add remaining elements from either left or right array
  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}`,
  steps: [
    {
      explanation: "Merge sort follows the divide and conquer approach. Let's start with an unsorted array.",
      array: [
        { value: 38, state: 'default' },
        { value: 27, state: 'default' },
        { value: 43, state: 'default' },
        { value: 3, state: 'default' },
        { value: 9, state: 'default' },
        { value: 82, state: 'default' },
        { value: 10, state: 'default' },
      ],
      variables: {
        arrayLength: 7
      }
    },
    {
      explanation: "First, we divide the array into two halves. We'll recursively divide until we have subarrays of size 1, which are sorted by definition.",
      array: [
        { value: 38, state: 'current' },
        { value: 27, state: 'current' },
        { value: 43, state: 'current' },
        { value: 3, state: 'default' },
        { value: 9, state: 'default' },
        { value: 82, state: 'default' },
        { value: 10, state: 'default' },
      ],
      variables: {
        left: [38, 27, 43],
        right: [3, 9, 82, 10],
        mid: 3
      }
    },
    {
      explanation: "We further divide the left subarray [38, 27, 43] into [38] and [27, 43], and divide the right subarray similarly.",
      array: [
        { value: 38, state: 'current' },
        { value: 27, state: 'current' },
        { value: 43, state: 'current' },
        { value: 3, state: 'default' },
        { value: 9, state: 'default' },
        { value: 82, state: 'default' },
        { value: 10, state: 'default' },
      ],
      variables: {
        leftOfLeft: [38],
        rightOfLeft: [27, 43]
      }
    },
    {
      explanation: "After dividing all subarrays to size 1, we start merging them back in sorted order. We merge [38] and [27, 43] (which becomes [27, 43] after its own merge).",
      array: [
        { value: 38, state: 'default' },
        { value: 27, state: 'visited' },
        { value: 43, state: 'visited' },
        { value: 3, state: 'default' },
        { value: 9, state: 'default' },
        { value: 82, state: 'default' },
        { value: 10, state: 'default' },
      ],
      variables: {
        mergedLeft: [27, 38, 43]
      }
    },
    {
      explanation: "We do the same for the right subarray, dividing and merging until it's sorted.",
      array: [
        { value: 38, state: 'default' },
        { value: 27, state: 'default' },
        { value: 43, state: 'default' },
        { value: 3, state: 'visited' },
        { value: 9, state: 'visited' },
        { value: 82, state: 'visited' },
        { value: 10, state: 'visited' },
      ],
      variables: {
        mergedRight: [3, 9, 10, 82]
      }
    },
    {
      explanation: "Finally, we merge the two sorted halves [27, 38, 43] and [3, 9, 10, 82] into a single sorted array.",
      array: [
        { value: 27, state: 'current' },
        { value: 38, state: 'current' },
        { value: 43, state: 'current' },
        { value: 3, state: 'current' },
        { value: 9, state: 'current' },
        { value: 10, state: 'current' },
        { value: 82, state: 'current' },
      ],
      variables: {
        leftIndex: 0,
        rightIndex: 0,
        result: []
      }
    },
    {
      explanation: "In the merge operation, we compare elements from both arrays and add the smaller one to our result array. After completing the merge, we have our sorted array.",
      array: [
        { value: 3, state: 'highlighted' },
        { value: 9, state: 'highlighted' },
        { value: 10, state: 'highlighted' },
        { value: 27, state: 'highlighted' },
        { value: 38, state: 'highlighted' },
        { value: 43, state: 'highlighted' },
        { value: 82, state: 'highlighted' },
      ],
      variables: {
        result: [3, 9, 10, 27, 38, 43, 82]
      }
    }
  ]
};
