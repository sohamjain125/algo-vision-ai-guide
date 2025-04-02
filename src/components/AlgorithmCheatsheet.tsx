
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Code, ArrowRightLeft, Clock } from 'lucide-react';

const cheatsheetData = {
  sorting: [
    {
      name: "Bubble Sort",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      description: "Simple comparison-based sort that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
      code: "function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}"
    },
    {
      name: "Quick Sort",
      timeComplexity: "O(n log n) - average, O(n²) - worst",
      spaceComplexity: "O(log n)",
      description: "Divide-and-conquer algorithm that selects a 'pivot' element and partitions the array around the pivot.",
      code: "function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[Math.floor(arr.length / 2)];\n  const left = arr.filter(x => x < pivot);\n  const middle = arr.filter(x => x === pivot);\n  const right = arr.filter(x => x > pivot);\n  return [...quickSort(left), ...middle, ...quickSort(right)];\n}"
    },
    {
      name: "Merge Sort",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      description: "Divide-and-conquer algorithm that divides array into two halves, sorts each half, then merges them.",
      code: "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  let result = [];\n  while (left.length && right.length) {\n    if (left[0] <= right[0]) result.push(left.shift());\n    else result.push(right.shift());\n  }\n  return [...result, ...left, ...right];\n}"
    },
    {
      name: "Heap Sort",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      description: "Comparison-based sort that uses a binary heap data structure. It divides the input into a sorted and an unsorted region.",
      code: "function heapSort(arr) {\n  let n = arr.length;\n  \n  // Build heap (rearrange array)\n  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)\n    heapify(arr, n, i);\n  \n  // Extract elements one by one from heap\n  for (let i = n - 1; i > 0; i--) {\n    [arr[0], arr[i]] = [arr[i], arr[0]];\n    heapify(arr, i, 0);\n  }\n  return arr;\n}\n\nfunction heapify(arr, n, i) {\n  let largest = i;\n  const left = 2 * i + 1;\n  const right = 2 * i + 2;\n  \n  if (left < n && arr[left] > arr[largest])\n    largest = left;\n  \n  if (right < n && arr[right] > arr[largest])\n    largest = right;\n  \n  if (largest !== i) {\n    [arr[i], arr[largest]] = [arr[largest], arr[i]];\n    heapify(arr, n, largest);\n  }\n}"
    }
  ],
  searching: [
    {
      name: "Binary Search",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1) - iterative, O(log n) - recursive",
      description: "Search algorithm that finds the position of a target value within a sorted array.",
      code: "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  \n  return -1; // Not found\n}"
    },
    {
      name: "Linear Search",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      description: "Simple search algorithm that checks each element of the array until it finds a match or reaches the end.",
      code: "function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1; // Not found\n}"
    }
  ],
  dataStructures: [
    {
      name: "Binary Search Tree",
      operations: "Insert: O(log n), Search: O(log n), Delete: O(log n)",
      spaceComplexity: "O(n)",
      description: "Tree data structure where each node has at most two children, and for each node, all elements in left subtree are less than the node, and all elements in right subtree are greater.",
      code: "class Node {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nclass BinarySearchTree {\n  constructor() {\n    this.root = null;\n  }\n  \n  insert(value) {\n    const newNode = new Node(value);\n    if (!this.root) {\n      this.root = newNode;\n      return this;\n    }\n    \n    let current = this.root;\n    while (true) {\n      if (value === current.value) return this;\n      if (value < current.value) {\n        if (!current.left) {\n          current.left = newNode;\n          return this;\n        }\n        current = current.left;\n      } else {\n        if (!current.right) {\n          current.right = newNode;\n          return this;\n        }\n        current = current.right;\n      }\n    }\n  }\n\n  search(value) {\n    if (!this.root) return false;\n    \n    let current = this.root;\n    while (current) {\n      if (value === current.value) return true;\n      if (value < current.value) current = current.left;\n      else current = current.right;\n    }\n    return false;\n  }\n}"
    },
    {
      name: "Linked List",
      operations: "Insert: O(1) - head/tail, O(n) - middle, Search: O(n)",
      spaceComplexity: "O(n)",
      description: "Linear collection of elements where each element points to the next, allowing for efficient insertion and removal of elements.",
      code: "class Node {\n  constructor(value) {\n    this.value = value;\n    this.next = null;\n  }\n}\n\nclass LinkedList {\n  constructor() {\n    this.head = null;\n    this.tail = null;\n    this.length = 0;\n  }\n  \n  push(value) {\n    const newNode = new Node(value);\n    if (!this.head) {\n      this.head = newNode;\n      this.tail = newNode;\n    } else {\n      this.tail.next = newNode;\n      this.tail = newNode;\n    }\n    this.length++;\n    return this;\n  }\n  \n  pop() {\n    if (!this.head) return undefined;\n    \n    if (this.length === 1) {\n      const temp = this.head;\n      this.head = null;\n      this.tail = null;\n      this.length = 0;\n      return temp;\n    }\n    \n    let current = this.head;\n    let newTail = current;\n    \n    while (current.next) {\n      newTail = current;\n      current = current.next;\n    }\n    \n    this.tail = newTail;\n    this.tail.next = null;\n    this.length--;\n    return current;\n  }\n}"
    }
  ]
};

const AlgorithmCheatsheet: React.FC = () => {
  return (
    <div className="w-full">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Algorithm Cheatsheet
          </CardTitle>
          <CardDescription>
            Quick reference for common algorithms and data structures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sorting" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="sorting">Sorting</TabsTrigger>
              <TabsTrigger value="searching">Searching</TabsTrigger>
              <TabsTrigger value="dataStructures">Data Structures</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sorting" className="space-y-4">
              {cheatsheetData.sorting.map((algorithm, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{algorithm.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-amber-400" />
                        <span>{algorithm.timeComplexity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowRightLeft className="h-4 w-4 text-green-400" />
                        <span>{algorithm.spaceComplexity}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm mb-3">{algorithm.description}</p>
                    <details className="text-xs">
                      <summary className="cursor-pointer font-medium flex items-center gap-1 hover:text-primary">
                        <Code className="h-3.5 w-3.5" />
                        View Code
                      </summary>
                      <pre className="mt-2 p-3 bg-card/80 rounded-md overflow-auto text-xs">
                        <code>{algorithm.code}</code>
                      </pre>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="searching" className="space-y-4">
              {cheatsheetData.searching.map((algorithm, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{algorithm.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-amber-400" />
                        <span>{algorithm.timeComplexity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowRightLeft className="h-4 w-4 text-green-400" />
                        <span>{algorithm.spaceComplexity}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm mb-3">{algorithm.description}</p>
                    <details className="text-xs">
                      <summary className="cursor-pointer font-medium flex items-center gap-1 hover:text-primary">
                        <Code className="h-3.5 w-3.5" />
                        View Code
                      </summary>
                      <pre className="mt-2 p-3 bg-card/80 rounded-md overflow-auto text-xs">
                        <code>{algorithm.code}</code>
                      </pre>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="dataStructures" className="space-y-4">
              {cheatsheetData.dataStructures.map((item, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-amber-400" />
                        <span>{item.operations}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowRightLeft className="h-4 w-4 text-green-400" />
                        <span>{item.spaceComplexity}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm mb-3">{item.description}</p>
                    <details className="text-xs">
                      <summary className="cursor-pointer font-medium flex items-center gap-1 hover:text-primary">
                        <Code className="h-3.5 w-3.5" />
                        View Code
                      </summary>
                      <pre className="mt-2 p-3 bg-card/80 rounded-md overflow-auto text-xs">
                        <code>{item.code}</code>
                      </pre>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlgorithmCheatsheet;
