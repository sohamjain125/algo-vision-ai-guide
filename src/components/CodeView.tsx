
import React, { useState } from 'react';
import { Algorithm } from '@/types/AlgorithmTypes';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Code, FileText, Copy, Check, FileCode, FileJson, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeViewProps {
  algorithm: Algorithm;
}

const CodeView: React.FC<CodeViewProps> = ({ algorithm }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'implementation' | 'pseudocode' | 'complexity'>('implementation');
  const [darkTheme, setDarkTheme] = useState(true);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(algorithm.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid w-auto grid-cols-3">
            <TabsTrigger value="implementation" className="flex items-center gap-1">
              <FileCode className="h-4 w-4" />
              Implementation
            </TabsTrigger>
            <TabsTrigger value="pseudocode" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Pseudocode
            </TabsTrigger>
            <TabsTrigger value="complexity" className="flex items-center gap-1">
              <FileJson className="h-4 w-4" />
              Complexity
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center space-x-1"
            >
              <Info className="h-4 w-4 mr-1" />
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDarkTheme(!darkTheme)}
              className="flex items-center space-x-1"
            >
              {darkTheme ? (
                <>
                  <Sun className="h-4 w-4 mr-1" />
                  <span>Light Theme</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-1" />
                  <span>Dark Theme</span>
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center space-x-1"
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1 text-green-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  <span>Copy Code</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {showExplanation && (
          <Card className="mb-4 animate-fade-in">
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2 gradient-text">How to Read This Code</h4>
              <p className="text-sm text-muted-foreground">
                This code implements the {algorithm.name} algorithm. Look for the main function and follow the logic step by step.
                The most important parts are highlighted in the visualization.
              </p>
            </CardContent>
          </Card>
        )}
        
        <TabsContent value="implementation" className="mt-0">
          <Card className="glass shadow-lg border border-primary/10">
            <CardHeader className="py-3 px-4 border-b border-primary/10">
              <CardTitle className="text-sm font-medium flex items-center">
                <Code className="h-4 w-4 text-primary mr-2" />
                {algorithm.name} Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-muted rounded-b-md overflow-auto max-h-[500px]">
                {algorithm.code && (
                  <SyntaxHighlighter
                    language="javascript"
                    style={darkTheme ? vs2015 : vs}
                    showLineNumbers
                    wrapLines
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      borderRadius: '0 0 0.5rem 0.5rem',
                      background: darkTheme ? '#1e1e1e' : '#f8f8f8',
                    }}
                  >
                    {algorithm.code}
                  </SyntaxHighlighter>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pseudocode" className="mt-0">
          <Card className="glass shadow-lg border border-primary/10">
            <CardHeader className="py-3 px-4 border-b border-primary/10">
              <CardTitle className="text-sm font-medium flex items-center">
                <FileText className="h-4 w-4 text-primary mr-2" />
                {algorithm.name} Pseudocode
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-muted/50 rounded-md p-4 font-mono text-sm whitespace-pre-wrap">
                {algorithm.pseudocode || "Pseudocode not available for this algorithm."}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="complexity" className="mt-0">
          <Card className="glass shadow-lg border border-primary/10 overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-primary/10">
              <CardTitle className="text-sm font-medium flex items-center">
                <FileJson className="h-4 w-4 text-primary mr-2" />
                Complexity Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="h-3 w-3 rounded-full bg-primary/80 mr-2"></div>
                    <h3 className="text-sm font-medium">Time Complexity</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{algorithm.timeComplexity}</p>
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    <p>This means: {getComplexityExplanation(algorithm.timeComplexity)}</p>
                  </div>
                </div>
                
                <div className="p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500/80 mr-2"></div>
                    <h3 className="text-sm font-medium">Space Complexity</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{algorithm.spaceComplexity}</p>
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    <p>This means: {getComplexityExplanation(algorithm.spaceComplexity)}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-border">
                <h3 className="text-sm font-medium mb-2">Best Use Cases</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {getAlgorithmUseCases(algorithm.id).map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to provide complexity explanations
function getComplexityExplanation(complexity: string): string {
  if (complexity.includes('O(1)')) {
    return 'The algorithm takes the same amount of time/space regardless of input size.';
  } else if (complexity.includes('O(log n)')) {
    return 'The algorithm scales very well with large inputs by repeatedly dividing the problem.';
  } else if (complexity.includes('O(n)')) {
    return 'The time/space grows linearly with the input size.';
  } else if (complexity.includes('O(n log n)')) {
    return 'The algorithm scales relatively well with larger inputs, common for efficient sorting.';
  } else if (complexity.includes('O(n²)')) {
    return 'The algorithm may become inefficient with large inputs due to quadratic growth.';
  } else if (complexity.includes('O(2^n)')) {
    return 'The algorithm grows exponentially with input size, often impractical for large inputs.';
  } else {
    return 'Varies depending on input characteristics.';
  }
}

// Helper function to provide use cases based on algorithm ID
function getAlgorithmUseCases(algorithmId: string): string[] {
  switch (algorithmId) {
    case 'binary-search':
      return [
        'Finding an element in a sorted array quickly',
        'Dictionary implementations and search boxes',
        'Determining insertion position in a sorted structure'
      ];
    case 'bubble-sort':
      return [
        'Educational purposes to understand sorting fundamentals',
        'Small data sets where simplicity is preferred over efficiency',
        'Nearly sorted arrays where only a few elements are out of place'
      ];
    case 'quick-sort':
      return [
        'General-purpose sorting when average-case performance matters',
        'Systems with good cache locality',
        'When in-place sorting is needed to conserve memory'
      ];
    case 'binary-search-tree':
      return [
        'Implementing dictionaries and sets',
        'Priority queues and maps',
        'Applications requiring hierarchical data organization'
      ];
    case 'breadth-first-search':
      return [
        'Finding shortest paths in unweighted graphs',
        'Level-order traversal of trees',
        'Network analysis and social networks'
      ];
    case 'depth-first-search':
      return [
        'Maze generation and solving',
        'Topological sorting',
        'Finding connected components in a graph',
        'Cycle detection in graphs'
      ];
    case 'dijkstra':
      return [
        'GPS and navigation systems',
        'Network routing protocols',
        'Finding shortest paths in weighted graphs',
        'Robot path planning'
      ];
    case 'heap-sort':
      return [
        'Systems with limited memory where O(1) extra space is important',
        'Priority queue implementations',
        'Sorting with guaranteed O(n log n) worst-case performance'
      ];
    case 'merge-sort':
      return [
        'External sorting of large data sets',
        'Stable sorting requirements',
        'Linked list sorting',
        'When guaranteed O(n log n) performance is needed'
      ];
    case 'linked-list':
      return [
        'Dynamic memory allocation',
        'Implementing stacks, queues, and hash tables',
        'Music playlist management',
        'Undo functionality in applications'
      ];
    case 'insertion-sort':
      return [
        'Small data sets or nearly sorted arrays',
        'Online algorithms where elements arrive sequentially',
        'Efficient for arrays that are already partially sorted'
      ];
    case 'selection-sort':
      return [
        'Small data sets where simplicity is preferred',
        'When memory writes need to be minimized',
        'Educational purposes to understand sorting concepts'
      ];
    default:
      return ['General problem solving', 'Algorithm design practice', 'Computer science education'];
  }
}

export default CodeView;
