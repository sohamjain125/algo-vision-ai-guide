
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Book, Video, Lightbulb, GraduationCap, Code } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Resource {
  title: string;
  url: string;
  description: string;
  type: 'article' | 'video' | 'tutorial' | 'book' | 'interactive';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const resources: Record<string, Resource[]> = {
  sorting: [
    {
      title: "Sorting Algorithms Explained",
      url: "https://www.geeksforgeeks.org/sorting-algorithms/",
      description: "Comprehensive guide to various sorting algorithms with examples and comparisons.",
      type: 'article',
      difficulty: 'beginner'
    },
    {
      title: "Visualizing Sorting Algorithms",
      url: "https://visualgo.net/en/sorting",
      description: "Interactive visualization of sorting algorithms to help understand their mechanics.",
      type: 'interactive',
      difficulty: 'beginner'
    },
    {
      title: "MIT OCW: Introduction to Algorithms - Sorting",
      url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
      description: "Lectures from MIT's Introduction to Algorithms course covering sorting algorithms.",
      type: 'video',
      difficulty: 'intermediate'
    },
    {
      title: "Grokking Algorithms: Sorting",
      url: "https://www.manning.com/books/grokking-algorithms",
      description: "Illustrated guide to algorithms with a focus on practical examples and clear explanations.",
      type: 'book',
      difficulty: 'beginner'
    }
  ],
  searching: [
    {
      title: "Search Algorithms Explained",
      url: "https://www.geeksforgeeks.org/searching-algorithms/",
      description: "Overview of common search algorithms with implementations and time complexity analysis.",
      type: 'article',
      difficulty: 'beginner'
    },
    {
      title: "Binary Search Visualization",
      url: "https://visualgo.net/en/bst",
      description: "Interactive tool for visualizing binary search in action.",
      type: 'interactive',
      difficulty: 'beginner'
    },
    {
      title: "CS50: Searching Algorithms",
      url: "https://cs50.harvard.edu/x/2023/",
      description: "Harvard's CS50 course material on searching algorithms and their implementations.",
      type: 'video',
      difficulty: 'beginner'
    }
  ],
  trees: [
    {
      title: "Tree Data Structures",
      url: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
      description: "Comprehensive guide to tree data structures with implementations and applications.",
      type: 'article',
      difficulty: 'intermediate'
    },
    {
      title: "Visualizing Binary Search Trees",
      url: "https://visualgo.net/en/bst",
      description: "Interactive visualization of binary search trees and operations.",
      type: 'interactive',
      difficulty: 'intermediate'
    },
    {
      title: "MIT OCW: AVL Trees and Balanced BSTs",
      url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
      description: "Lectures on self-balancing binary search trees and their implementations.",
      type: 'video',
      difficulty: 'advanced'
    }
  ],
  graphs: [
    {
      title: "Graph Algorithms",
      url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
      description: "Detailed explanation of graph algorithms and their applications.",
      type: 'article',
      difficulty: 'intermediate'
    },
    {
      title: "Visualizing Graph Algorithms",
      url: "https://visualgo.net/en/graphds",
      description: "Interactive tool for visualizing graph traversals and shortest path algorithms.",
      type: 'interactive',
      difficulty: 'intermediate'
    },
    {
      title: "Stanford Algorithm Specialization: Graph Algorithms",
      url: "https://www.coursera.org/specializations/algorithms",
      description: "Stanford's algorithm course covering graph search, shortest paths, and network flows.",
      type: 'tutorial',
      difficulty: 'advanced'
    }
  ],
  general: [
    {
      title: "Big O Notation Explained",
      url: "https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/",
      description: "Guide to understanding Big O notation and algorithm complexity analysis.",
      type: 'article',
      difficulty: 'beginner'
    },
    {
      title: "Data Structures and Algorithms in JavaScript",
      url: "https://github.com/trekhleb/javascript-algorithms",
      description: "Collection of JavaScript implementations of algorithms and data structures with explanations.",
      type: 'interactive',
      difficulty: 'intermediate'
    },
    {
      title: "Algorithms Part I - Princeton University",
      url: "https://www.coursera.org/learn/algorithms-part1",
      description: "Comprehensive course covering fundamental data structures and algorithms.",
      type: 'tutorial',
      difficulty: 'intermediate'
    },
    {
      title: "Introduction to Algorithms (CLRS)",
      url: "https://mitpress.mit.edu/books/introduction-algorithms-third-edition",
      description: "The definitive guide to algorithms and data structures by Cormen, Leiserson, Rivest, and Stein.",
      type: 'book',
      difficulty: 'advanced'
    }
  ]
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'article': return <Book className="h-4 w-4" />;
    case 'video': return <Video className="h-4 w-4" />;
    case 'interactive': return <Code className="h-4 w-4" />;
    case 'tutorial': return <GraduationCap className="h-4 w-4" />;
    case 'book': return <Book className="h-4 w-4" />;
    default: return <Lightbulb className="h-4 w-4" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-500/20 text-green-500 hover:bg-green-500/30';
    case 'intermediate': return 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30';
    case 'advanced': return 'bg-red-500/20 text-red-500 hover:bg-red-500/30';
    default: return 'bg-primary/20 text-primary hover:bg-primary/30';
  }
};

const LearningResources: React.FC = () => {
  return (
    <div className="w-full">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Learning Resources
          </CardTitle>
          <CardDescription>
            Curated resources to deepen your understanding of algorithms and data structures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="sorting">Sorting</TabsTrigger>
              <TabsTrigger value="searching">Searching</TabsTrigger>
              <TabsTrigger value="trees">Trees</TabsTrigger>
              <TabsTrigger value="graphs">Graphs</TabsTrigger>
            </TabsList>
            
            {Object.keys(resources).map(category => (
              <TabsContent key={category} value={category} className="space-y-4">
                {resources[category].map((resource, index) => (
                  <Card key={index} className="bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base flex items-center gap-2">
                          {getTypeIcon(resource.type)}
                          <span>{resource.title}</span>
                        </CardTitle>
                        <Badge className={getDifficultyColor(resource.difficulty)}>
                          {resource.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm mb-3">{resource.description}</p>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary text-sm flex items-center gap-1 hover:underline"
                      >
                        Visit Resource
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningResources;
