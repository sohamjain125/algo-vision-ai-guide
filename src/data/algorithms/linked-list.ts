
import { Algorithm } from '@/types/AlgorithmTypes';

export const linkedList: Algorithm = {
  id: 'linked-list',
  name: 'Linked List',
  category: 'other',
  description: 'A linear data structure consisting of nodes where each node contains data and a reference to the next node in the sequence.',
  timeComplexity: 'Search: O(n), Insert/Delete at beginning: O(1), Insert/Delete at end: O(n)',
  spaceComplexity: 'O(n)',
  code: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  
  // Add node to the end of the list
  append(value) {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.length++;
    return this;
  }
  
  // Add node to the beginning of the list
  prepend(value) {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.length++;
    return this;
  }
  
  // Remove node from the end of the list
  pop() {
    if (!this.head) return undefined;
    
    let current = this.head;
    let newTail = current;
    
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    
    return current;
  }
  
  // Get node at specific index
  get(index) {
    if (index < 0 || index >= this.length) return null;
    
    let counter = 0;
    let current = this.head;
    
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    
    return current;
  }
}`,
  steps: [
    {
      explanation: "A Linked List is a linear data structure consisting of nodes. Each node contains data and a reference (or link) to the next node. Let's create an empty linked list.",
      variables: {
        head: null,
        tail: null,
        length: 0
      }
    },
    {
      explanation: "Let's append a node with value 10 to our linked list. Since the list is empty, both head and tail will point to this new node.",
      variables: {
        head: { value: 10, next: null },
        tail: { value: 10, next: null },
        length: 1,
        operation: "append(10)"
      }
    },
    {
      explanation: "Let's append another node with value 20. The tail's next pointer will point to the new node, and tail will be updated to the new node.",
      variables: {
        head: { value: 10, next: { value: 20, next: null } },
        tail: { value: 20, next: null },
        length: 2,
        operation: "append(20)"
      }
    },
    {
      explanation: "Now let's prepend a node with value 5. The new node's next pointer will point to the current head, and head will be updated to the new node.",
      variables: {
        head: { value: 5, next: { value: 10, next: { value: 20, next: null } } },
        tail: { value: 20, next: null },
        length: 3,
        operation: "prepend(5)"
      }
    },
    {
      explanation: "Let's append one more node with value 30 to the end of the list.",
      variables: {
        head: { value: 5, next: { value: 10, next: { value: 20, next: { value: 30, next: null } } } },
        tail: { value: 30, next: null },
        length: 4,
        operation: "append(30)"
      }
    },
    {
      explanation: "If we want to get a node at a specific index, like index 2, we need to traverse the list from the head until we reach that index.",
      variables: {
        head: { value: 5, next: { value: 10, next: { value: 20, next: { value: 30, next: null } } } },
        tail: { value: 30, next: null },
        length: 4,
        operation: "get(2)",
        result: { value: 20, next: { value: 30, next: null } }
      }
    },
    {
      explanation: "Let's remove a node from the end of the list using the pop method. We'll need to traverse the list to find the new tail.",
      variables: {
        head: { value: 5, next: { value: 10, next: { value: 20, next: null } } },
        tail: { value: 20, next: null },
        length: 3,
        operation: "pop()",
        removedNode: { value: 30, next: null }
      }
    },
    {
      explanation: "Linked lists are useful for dynamic collections where elements are frequently inserted or removed. They use more memory than arrays (due to storing pointers) but have constant-time insertion and deletion at the beginning.",
      variables: {
        head: { value: 5, next: { value: 10, next: { value: 20, next: null } } },
        tail: { value: 20, next: null },
        length: 3
      }
    }
  ]
};
