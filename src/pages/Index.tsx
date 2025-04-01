
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { SearchIcon, Code, ArrowLeftIcon, ArrowRightIcon, RefreshCwIcon, PlayIcon, PauseIcon } from "lucide-react";
import ChatMessage from '@/components/ChatMessage';
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer';
import CodeView from '@/components/CodeView';
import { Message, Algorithm, VisualizationStep } from '@/types/AlgorithmTypes';
import { getAlgorithmByQuery } from '@/lib/algorithm-matcher';
import { algorithmExamples } from '@/data/algorithm-examples';

const Index = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Welcome to AlgoVision AI! Ask me to visualize any algorithm or data structure, like "Show me how binary search works" or "Visualize a bubble sort algorithm".'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<Algorithm | null>(null);
  const [visualizationSpeed, setVisualizationSpeed] = useState(50);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('visualization');

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      try {
        const matchedAlgorithm = getAlgorithmByQuery(input);
        
        if (matchedAlgorithm) {
          setCurrentAlgorithm(matchedAlgorithm);
          setCurrentStep(0);
          
          const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'system',
            content: `I'll show you how ${matchedAlgorithm.name} works. You can use the controls below to step through the visualization.`
          };
          
          setMessages(prev => [...prev, responseMessage]);
        } else {
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'system',
            content: "I'm sorry, I couldn't identify an algorithm from your request. Try asking about a specific algorithm like 'Show me binary search' or 'How does bubble sort work?'"
          };
          
          setMessages(prev => [...prev, errorMessage]);
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "An error occurred while processing your request.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const handleNextStep = () => {
    if (!currentAlgorithm || currentStep >= currentAlgorithm.steps.length - 1) return;
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (!currentAlgorithm || currentStep <= 0) return;
    setCurrentStep(prev => prev - 1);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setPlaying(false);
  };

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  // Auto-advance steps when playing
  React.useEffect(() => {
    if (!playing || !currentAlgorithm) return;
    
    const interval = setInterval(() => {
      if (currentStep < currentAlgorithm.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setPlaying(false);
      }
    }, 1000 - (visualizationSpeed * 9)); // Scale: 100 = 100ms, 0 = 1000ms
    
    return () => clearInterval(interval);
  }, [playing, currentStep, currentAlgorithm, visualizationSpeed]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="px-6 py-4 border-b bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">AlgoVision AI</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Chat sidebar */}
        <div className="w-full lg:w-1/3 border-r border-border flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {loading && (
              <div className="flex justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse mx-1"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse mx-1" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse mx-1" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex space-x-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about an algorithm..."
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !input.trim()}>
                <SearchIcon className="w-4 h-4" />
              </Button>
            </form>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                {algorithmExamples.map((example, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExampleClick(example)}
                    className="text-xs"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentAlgorithm ? (
            <>
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">{currentAlgorithm.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{currentAlgorithm.description}</p>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <div className="px-4 border-b">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="visualization">Visualization</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="visualization" className="flex-1 overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-auto p-4">
                    <AlgorithmVisualizer
                      algorithm={currentAlgorithm}
                      currentStep={currentStep}
                    />
                  </div>

                  {currentAlgorithm.steps.length > 0 && (
                    <div className="p-4 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-medium">
                          Step {currentStep + 1} of {currentAlgorithm.steps.length}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">Slow</span>
                          <Slider
                            value={[visualizationSpeed]}
                            onValueChange={(values) => setVisualizationSpeed(values[0])}
                            max={100}
                            step={1}
                            className="w-24"
                          />
                          <span className="text-xs text-muted-foreground">Fast</span>
                        </div>
                      </div>
                      
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm">
                            {currentAlgorithm.steps[currentStep]?.explanation || 'No explanation available for this step.'}
                          </p>
                        </CardContent>
                      </Card>
                      
                      <div className="flex items-center justify-between mt-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleRestart}
                          disabled={currentStep === 0}
                        >
                          <RefreshCwIcon className="h-4 w-4" />
                        </Button>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handlePrevStep}
                            disabled={currentStep === 0}
                          >
                            <ArrowLeftIcon className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={togglePlay}
                          >
                            {playing ? (
                              <PauseIcon className="h-4 w-4" />
                            ) : (
                              <PlayIcon className="h-4 w-4" />
                            )}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleNextStep}
                            disabled={currentStep === currentAlgorithm.steps.length - 1}
                          >
                            <ArrowRightIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="w-8"></div> {/* Spacer for alignment */}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="code" className="flex-1 overflow-auto p-4">
                  <CodeView algorithm={currentAlgorithm} />
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Visualize Algorithms & Data Structures</h2>
              <p className="text-muted-foreground max-w-md mb-6">
                Ask a question about an algorithm or data structure to see it visualized step by step with interactive controls.
              </p>
              <Button onClick={() => handleExampleClick("Show me how binary search works")}>
                Try an Example
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
