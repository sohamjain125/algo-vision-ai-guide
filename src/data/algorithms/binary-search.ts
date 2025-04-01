
import { Algorithm, ArrayElement } from '@/types/AlgorithmTypes';

export const binarySearch: Algorithm = {
  id: 'binary-search',
  name: 'Binary Search',
  category: 'searching',
  description: 'An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.',
  timeComplexity: 'O(log n)',
  spaceComplexity: 'O(1)',
  code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    // Find the middle index
    let mid = Math.floor((left + right) / 2);
    
    // If element is present at the middle
    if (arr[mid] === target) {
      return mid;
    }
    
    // If element is smaller than mid, search left subarray
    if (arr[mid] > target) {
      right = mid - 1;
    } 
    // Else search right subarray
    else {
      left = mid + 1;
    }
  }
  
  // Element is not present in array
  return -1;
}`,
  steps: [
    {
      explanation: "We start with a sorted array and a target value to find. Binary search requires a sorted array to work correctly.",
      array: [
        { value: 10, state: 'default' },
        { value: 20, state: 'default' },
        { value: 30, state: 'default' },
        { value: 40, state: 'default' },
        { value: 50, state: 'default' },
        { value: 60, state: 'default' },
        { value: 70, state: 'default' },
        { value: 80, state: 'default' },
        { value: 90, state: 'default' },
      ],
      variables: {
        target: 60,
        left: 0,
        right: 8,
        mid: null
      }
    },
    {
      explanation: "Calculate the middle index of the array. Compare the middle element with the target value.",
      array: [
        { value: 10, state: 'default' },
        { value: 20, state: 'default' },
        { value: 30, state: 'default' },
        { value: 40, state: 'default' },
        { value: 50, state: 'current' },
        { value: 60, state: 'default' },
        { value: 70, state: 'default' },
        { value: 80, state: 'default' },
        { value: 90, state: 'default' },
      ],
      variables: {
        target: 60,
        left: 0,
        right: 8,
        mid: 4
      }
    },
    {
      explanation: "The middle element (50) is less than our target (60). We need to search the right half of the array. We update the left pointer to mid + 1.",
      array: [
        { value: 10, state: 'visited' },
        { value: 20, state: 'visited' },
        { value: 30, state: 'visited' },
        { value: 40, state: 'visited' },
        { value: 50, state: 'visited' },
        { value: 60, state: 'default' },
        { value: 70, state: 'default' },
        { value: 80, state: 'default' },
        { value: 90, state: 'default' },
      ],
      pointers: {
        left: 5,
        right: 8
      },
      variables: {
        target: 60,
        left: 5,
        right: 8,
        mid: 4
      }
    },
    {
      explanation: "Calculate the new middle index for the right subarray. Compare the middle element with the target value.",
      array: [
        { value: 10, state: 'visited' },
        { value: 20, state: 'visited' },
        { value: 30, state: 'visited' },
        { value: 40, state: 'visited' },
        { value: 50, state: 'visited' },
        { value: 60, state: 'default' },
        { value: 70, state: 'current' },
        { value: 80, state: 'default' },
        { value: 90, state: 'default' },
      ],
      pointers: {
        left: 5,
        right: 8
      },
      variables: {
        target: 60,
        left: 5,
        right: 8,
        mid: 6
      }
    },
    {
      explanation: "The middle element (70) is greater than our target (60). We need to search the left half of the current subarray. We update the right pointer to mid - 1.",
      array: [
        { value: 10, state: 'visited' },
        { value: 20, state: 'visited' },
        { value: 30, state: 'visited' },
        { value: 40, state: 'visited' },
        { value: 50, state: 'visited' },
        { value: 60, state: 'default' },
        { value: 70, state: 'visited' },
        { value: 80, state: 'visited' },
        { value: 90, state: 'visited' },
      ],
      pointers: {
        left: 5,
        right: 5
      },
      variables: {
        target: 60,
        left: 5,
        right: 5,
        mid: 6
      }
    },
    {
      explanation: "Calculate the new middle index. Since left and right are both 5, mid is also 5.",
      array: [
        { value: 10, state: 'visited' },
        { value: 20, state: 'visited' },
        { value: 30, state: 'visited' },
        { value: 40, state: 'visited' },
        { value: 50, state: 'visited' },
        { value: 60, state: 'current' },
        { value: 70, state: 'visited' },
        { value: 80, state: 'visited' },
        { value: 90, state: 'visited' },
      ],
      pointers: {
        left: 5,
        right: 5
      },
      variables: {
        target: 60,
        left: 5,
        right: 5,
        mid: 5
      }
    },
    {
      explanation: "The middle element (60) is equal to our target (60). We've found the element at index 5! Binary search successfully returns the index of the target element.",
      array: [
        { value: 10, state: 'visited' },
        { value: 20, state: 'visited' },
        { value: 30, state: 'visited' },
        { value: 40, state: 'visited' },
        { value: 50, state: 'visited' },
        { value: 60, state: 'highlighted' },
        { value: 70, state: 'visited' },
        { value: 80, state: 'visited' },
        { value: 90, state: 'visited' },
      ],
      pointers: {
        left: 5,
        right: 5
      },
      variables: {
        target: 60,
        left: 5,
        right: 5,
        mid: 5,
        result: 5
      }
    }
  ]
};
