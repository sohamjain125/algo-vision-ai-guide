
import { Algorithm, TreeNode } from '@/types/AlgorithmTypes';

export const binarySearchTree: Algorithm = {
  id: 'binary-search-tree',
  name: 'Binary Search Tree',
  category: 'tree',
  description: 'A tree data structure where each node has at most two children, and for each node, all values in the left subtree are less than the node and all values in the right subtree are greater.',
  timeComplexity: 'O(log n) average case, O(n) worst case for search/insert/delete',
  spaceComplexity: 'O(n)',
  code: `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    const newNode = new Node(value);
    
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    
    while (true) {
      if (value === current.value) return this;
      
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
  
  search(value) {
    if (!this.root) return false;
    
    let current = this.root;
    let found = false;
    
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    
    if (!found) return false;
    return current;
  }
}`,
  steps: [
    {
      explanation: "A Binary Search Tree (BST) is a hierarchical data structure. Let's start by creating a root node with value 50.",
      tree: {
        value: 50,
        state: 'highlighted',
        left: null,
        right: null
      }
    },
    {
      explanation: "Let's insert a new value 30. Since 30 < 50, it goes to the left of the root.",
      tree: {
        value: 50,
        state: 'default',
        left: {
          value: 30,
          state: 'highlighted',
          left: null,
          right: null
        },
        right: null
      }
    },
    {
      explanation: "Now let's insert 70. Since 70 > 50, it goes to the right of the root.",
      tree: {
        value: 50,
        state: 'default',
        left: {
          value: 30,
          state: 'default',
          left: null,
          right: null
        },
        right: {
          value: 70,
          state: 'highlighted',
          left: null,
          right: null
        }
      }
    },
    {
      explanation: "Let's insert 20. We start at the root (50). Since 20 < 50, we go left to node 30. Since 20 < 30, it goes to the left of node 30.",
      tree: {
        value: 50,
        state: 'default',
        left: {
          value: 30,
          state: 'visited',
          left: {
            value: 20,
            state: 'highlighted',
            left: null,
            right: null
          },
          right: null
        },
        right: {
          value: 70,
          state: 'default',
          left: null,
          right: null
        }
      }
    },
    {
      explanation: "Let's insert 40. We start at the root (50). Since 40 < 50, we go left to node 30. Since 40 > 30, it goes to the right of node 30.",
      tree: {
        value: 50,
        state: 'default',
        left: {
          value: 30,
          state: 'visited',
          left: {
            value: 20,
            state: 'default',
            left: null,
            right: null
          },
          right: {
            value: 40,
            state: 'highlighted',
            left: null,
            right: null
          }
        },
        right: {
          value: 70,
          state: 'default',
          left: null,
          right: null
        }
      }
    },
    {
      explanation: "Let's insert 60 and 80. They'll go to the left and right of node 70 respectively.",
      tree: {
        value: 50,
        state: 'default',
        left: {
          value: 30,
          state: 'default',
          left: {
            value: 20,
            state: 'default',
            left: null,
            right: null
          },
          right: {
            value: 40,
            state: 'default',
            left: null,
            right: null
          }
        },
        right: {
          value: 70,
          state: 'visited',
          left: {
            value: 60,
            state: 'highlighted',
            left: null,
            right: null
          },
          right: {
            value: 80,
            state: 'highlighted',
            left: null,
            right: null
          }
        }
      }
    },
    {
      explanation: "To search for a value, we follow the same rules. Let's search for 40. We start at the root (50). Since 40 < 50, we go left to node 30. Since 40 > 30, we go right and find 40.",
      tree: {
        value: 50,
        state: 'visited',
        left: {
          value: 30,
          state: 'visited',
          left: {
            value: 20,
            state: 'default',
            left: null,
            right: null
          },
          right: {
            value: 40,
            state: 'highlighted',
            left: null,
            right: null
          }
        },
        right: {
          value: 70,
          state: 'default',
          left: {
            value: 60,
            state: 'default',
            left: null,
            right: null
          },
          right: {
            value: 80,
            state: 'default',
            left: null,
            right: null
          }
        }
      }
    },
    {
      explanation: "The BST property ensures that for any node, all nodes in its left subtree have smaller values, and all nodes in its right subtree have larger values. This makes operations like search, insert, and delete efficient in balanced trees.",
      tree: {
        value: 50,
        state: 'default',
        left: {
          value: 30,
          state: 'default',
          left: {
            value: 20,
            state: 'default',
            left: null,
            right: null
          },
          right: {
            value: 40,
            state: 'default',
            left: null,
            right: null
          }
        },
        right: {
          value: 70,
          state: 'default',
          left: {
            value: 60,
            state: 'default',
            left: null,
            right: null
          },
          right: {
            value: 80,
            state: 'default',
            left: null,
            right: null
          }
        }
      }
    }
  ]
};
