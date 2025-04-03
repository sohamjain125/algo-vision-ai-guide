
import React, { useState, useEffect } from 'react';
import { Algorithm } from '@/types/AlgorithmTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { PlayIcon, RotateCcwIcon, Code, FileText } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useToast } from '@/hooks/use-toast';

interface CodePlaygroundProps {
  algorithm: Algorithm;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ algorithm }) => {
  const { toast } = useToast();
  const [code, setCode] = useState(algorithm.code);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    setCode(algorithm.code);
  }, [algorithm]);

  const executeCode = () => {
    setIsRunning(true);
    setOutput('');
    
    try {
      // Create a safe execution environment
      const originalConsoleLog = console.log;
      let logs: string[] = [];
      
      // Override console.log to capture output
      console.log = (...args) => {
        logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
      };
      
      // Create a function from the code string and execute it
      const safeEval = new Function('algorithm', `
        try {
          ${code}
          // Add a default test case if the algorithm function exists
          if (typeof ${algorithm.id.replace(/-/g, '')} === 'function') {
            console.log('Testing with sample input:');
            ${getTestCaseForAlgorithm(algorithm.id)}
          }
        } catch (error) {
          console.log('Error:', error.message);
        }
      `);
      
      safeEval(algorithm);
      
      // Restore original console.log
      console.log = originalConsoleLog;
      
      setOutput(logs.join('\n'));
      
      if (logs.some(log => log.includes('Error:'))) {
        toast({
          title: "Execution Error",
          description: "There was an error running your code. See the console for details.",
          variant: "destructive"
        });
      } else if (logs.length > 0) {
        toast({
          title: "Code Executed",
          description: "Your code ran successfully!"
        });
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
      toast({
        title: "Execution Error",
        description: "There was an error running your code. See the console for details.",
        variant: "destructive"
      });
    }
    
    setIsRunning(false);
  };
  
  const resetCode = () => {
    setCode(algorithm.code);
    setOutput('');
    toast({
      title: "Code Reset",
      description: "Code has been reset to the original implementation."
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Tabs defaultValue="code" className="w-full">
        <TabsList className="grid w-64 grid-cols-2">
          <TabsTrigger value="code" className="flex items-center gap-1">
            <Code className="h-4 w-4" />
            Code Editor
          </TabsTrigger>
          <TabsTrigger value="instructions" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Instructions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="code" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="glass shadow-lg border border-primary/10">
              <CardHeader className="py-3 px-4 border-b border-primary/10">
                <CardTitle className="text-sm font-medium">
                  Editor: {algorithm.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-80 p-4 font-mono text-sm bg-muted/50 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </CardContent>
            </Card>

            <Card className="glass shadow-lg border border-primary/10">
              <CardHeader className="py-3 px-4 border-b border-primary/10 flex flex-row justify-between items-center">
                <CardTitle className="text-sm font-medium">Output</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetCode}
                    className="flex items-center"
                  >
                    <RotateCcwIcon className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button 
                    onClick={executeCode} 
                    disabled={isRunning}
                    size="sm" 
                    className="flex items-center"
                  >
                    <PlayIcon className="h-4 w-4 mr-1" />
                    Run
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-muted/80 h-80 overflow-auto font-mono text-sm p-4">
                  {output ? (
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  ) : (
                    <div className="text-muted-foreground h-full flex items-center justify-center">
                      Press "Run" to execute your code
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="instructions" className="mt-4">
          <Card className="glass shadow-lg border border-primary/10">
            <CardHeader className="py-3 px-4 border-b border-primary/10">
              <CardTitle className="text-sm font-medium">
                How to Use the {algorithm.name} Code Playground
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4 text-sm">
                <p>
                  This playground allows you to experiment with the {algorithm.name} implementation. 
                  You can modify the code and execute it to see the results.
                </p>
                
                <div>
                  <h3 className="font-medium mb-2">Instructions:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Edit the code in the editor panel</li>
                    <li>Click "Run" to execute the code</li>
                    <li>View the output in the output panel</li>
                    <li>Click "Reset" to restore the original code</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Sample Usage:</h3>
                  <SyntaxHighlighter 
                    language="javascript" 
                    style={vs2015}
                    customStyle={{ 
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      margin: 0
                    }}
                  >
                    {getUsageExampleForAlgorithm(algorithm.id)}
                  </SyntaxHighlighter>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to get test cases for specific algorithms
function getTestCaseForAlgorithm(algorithmId: string): string {
  switch (algorithmId) {
    case 'binary-search':
      return `
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const target = 7;
        console.log('Array:', arr);
        console.log('Target:', target);
        console.log('Result:', binarysearch(arr, target));
      `;
    case 'bubble-sort':
      return `
        const arr = [64, 34, 25, 12, 22, 11, 90];
        console.log('Original array:', arr);
        console.log('Sorted array:', bubblesort([...arr]));
      `;
    case 'quick-sort':
      return `
        const arr = [64, 34, 25, 12, 22, 11, 90];
        console.log('Original array:', arr);
        const arrCopy = [...arr];
        quicksort(arrCopy, 0, arrCopy.length - 1);
        console.log('Sorted array:', arrCopy);
      `;
    default:
      return `
        console.log('Sample test case for ${algorithmId} could be added here');
        // Try your own test cases!
      `;
  }
}

// Helper function to get usage examples for specific algorithms
function getUsageExampleForAlgorithm(algorithmId: string): string {
  switch (algorithmId) {
    case 'binary-search':
      return `// Find 7 in a sorted array
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 7;
const result = binarysearch(arr, target);
console.log(\`Found \${target} at index \${result}\`);`;
    case 'bubble-sort':
      return `// Sort an array
const arr = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = bubblesort([...arr]);
console.log('Sorted array:', sortedArray);`;
    default:
      return `// Example for ${algorithmId.replace(/-/g, ' ')}
// Modify the code and click Run to see the results!`;
  }
}

export default CodePlayground;
