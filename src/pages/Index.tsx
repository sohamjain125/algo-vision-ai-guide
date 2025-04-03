
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { SearchIcon, Code, ArrowLeftIcon, ArrowRightIcon, RefreshCwIcon, PlayIcon, PauseIcon, BookOpen, Lightbulb, GraduationCap, BarChart, FileText, Terminal } from "lucide-react";
import ChatMessage from '@/components/ChatMessage';
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer';
import CodeView from '@/components/CodeView';
import CodePlayground from '@/components/CodePlayground';
import AlgorithmCheatsheet from '@/components/AlgorithmCheatsheet';
import LearningResources from '@/components/LearningResources';
import AlgorithmComparison from '@/components/AlgorithmComparison';
import { Message, Algorithm, VisualizationStep } from '@/types/AlgorithmTypes';
import { getAlgorithmByQuery, getAlgorithmsForComparison } from '@/lib/algorithm-matcher';
import { algorithmExamples, algorithmLearningTips, algorithmUseCases } from '@/data/algorithm-examples';

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
  const [showLearningTips, setShowLearningTips] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [randomTip] = useState(() => {
    return algorithmLearningTips[Math.floor(Math.random() * algorithmLearningTips.length)];
  });
  const [comparisonAlgorithms, setComparisonAlgorithms] = useState<Algorithm[]>([]);
  const [isComparisonMode, setIsComparisonMode] = useState(false);

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

    // Check if this is a comparison query
    const isComparisonQuery = input.toLowerCase().includes('compare') || 
                             input.toLowerCase().includes('vs') || 
                             input.toLowerCase().includes('versus') || 
                             input.toLowerCase().includes('difference');

    // Simulate AI processing
    setTimeout(() => {
      try {
        if (isComparisonQuery) {
          // Handle comparison query
          const algorithmsToCompare = getAlgorithmsForComparison(input);
          
          if (algorithmsToCompare.length >= 2) {
            setCurrentAlgorithm(algorithmsToCompare[0]);
            setComparisonAlgorithms(algorithmsToCompare);
            setIsComparisonMode(true);
            setCurrentStep(0);
            setActiveTab('comparison');
            
            const responseMessage: Message = {
              id: (Date.now() + 1).toString(),
              role: 'system',
              content: `I'll compare ${algorithmsToCompare.map(a => a.name).join(' and ')} for you. Check out the comparison tab for details.`
            };
            
            setMessages(prev => [...prev, responseMessage]);
          } else {
            const errorMessage: Message = {
              id: (Date.now() + 1).toString(),
              role: 'system',
              content: "I couldn't identify multiple algorithms to compare. Try specifying two algorithms, like 'Compare bubble sort and quick sort'."
            };
            
            setMessages(prev => [...prev, errorMessage]);
          }
        } else {
          // Handle regular algorithm query
          const matchedAlgorithm = getAlgorithmByQuery(input);
          
          if (matchedAlgorithm) {
            setCurrentAlgorithm(matchedAlgorithm);
            setIsComparisonMode(false);
            setCurrentStep(0);
            setActiveTab('visualization');
            
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

  const getRelevantUseCase = () => {
    if (!currentAlgorithm) return null;
    
    const algorithmType = currentAlgorithm.name.toLowerCase();
    const useCase = Object.entries(algorithmUseCases).find(([key]) => 
      algorithmType.includes(key.toLowerCase())
    );
    
    return useCase ? useCase[1] : null;
  };

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
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowResources(!showResources)}
              className="flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              <span>Learning Resources</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowLearningTips(!showLearningTips)}
              className="flex items-center gap-1"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Learning Tips</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
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
            
            {showLearningTips && (
              <div className="glass-card p-4 my-4 animate-fade-in border-l-4 border-amber-400">
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-amber-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Learning Tip</h4>
                    <p className="text-sm text-muted-foreground">{randomTip}</p>
                  </div>
                </div>
                
                {currentAlgorithm && getRelevantUseCase() && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <h4 className="font-medium text-sm mb-1">Real-world Use Case:</h4>
                    <p className="text-sm text-muted-foreground">{getRelevantUseCase()}</p>
                  </div>
                )}
              </div>
            )}
            
            {showResources && <LearningResources />}
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
                className="flex-1 glass-input"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !input.trim()}>
                <SearchIcon className="w-4 h-4" />
              </Button>
            </form>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 text-primary mr-2" />
                  <p className="text-sm text-muted-foreground">Try asking about:</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowResources(true)}
                  className="text-xs"
                >
                  View All Resources
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {algorithmExamples.map((example, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExampleClick(example)}
                    className="text-xs hover:bg-primary/10 transition-colors"
                  >
                    {example}
                  </Button>
                ))}
              </div>
              
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExampleClick("Compare bubble sort vs quick sort")}
                  className="text-xs w-full hover:bg-primary/10 flex items-center justify-center gap-1 animate-pulse"
                  style={{ animationDuration: '3s' }}
                >
                  <BarChart className="h-3.5 w-3.5" />
                  Compare Algorithms (e.g. Bubble Sort vs Quick Sort)
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {currentAlgorithm ? (
            <>
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">{currentAlgorithm.name}</h2>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-muted-foreground">{currentAlgorithm.description}</p>
                  {getRelevantUseCase() && (
                    <div className="ml-3 flex items-center text-xs px-2 py-0.5 bg-primary/10 rounded-full">
                      <span className="text-primary">Real-world use: {getRelevantUseCase()}</span>
                    </div>
                  )}
                </div>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <div className="px-4 border-b">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="visualization" className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      Visualization
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex items-center gap-1">
                      <Code className="h-4 w-4" />
                      Code
                    </TabsTrigger>
                    <TabsTrigger value="playground" className="flex items-center gap-1">
                      <Terminal className="h-4 w-4" />
                      Playground
                    </TabsTrigger>
                    <TabsTrigger value="comparison" className="flex items-center gap-1" disabled={!isComparisonMode}>
                      <BarChart className="h-4 w-4" />
                      Comparison
                    </TabsTrigger>
                    <TabsTrigger value="cheatsheet" className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Cheatsheet
                    </TabsTrigger>
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
                        
                        <div className="w-8"></div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="code" className="flex-1 overflow-auto p-4">
                  <CodeView algorithm={currentAlgorithm} />
                </TabsContent>

                <TabsContent value="playground" className="flex-1 overflow-auto p-4">
                  <CodePlayground algorithm={currentAlgorithm} />
                </TabsContent>

                <TabsContent value="comparison" className="flex-1 overflow-auto p-4">
                  <AlgorithmComparison algorithms={comparisonAlgorithms} />
                </TabsContent>

                <TabsContent value="cheatsheet" className="flex-1 overflow-auto p-4">
                  <AlgorithmCheatsheet />
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-pulse">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2 gradient-text">Learn Algorithms & Data Structures</h2>
              <p className="text-muted-foreground max-w-md mb-6">
                Ask a question about an algorithm or data structure to see it visualized step by step with interactive controls.
              </p>
              <div className="flex gap-3">
                <Button onClick={() => handleExampleClick("Show me how binary search works")}>
                  Try Binary Search
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleExampleClick("Visualize bubble sort")}
                >
                  Explore Bubble Sort
                </Button>
              </div>
              
              <div className="mt-8 glass-card p-5 max-w-lg">
                <div className="flex items-center mb-3">
                  <Lightbulb className="h-5 w-5 text-amber-400 mr-2" />
                  <h3 className="font-medium">How to get the most from AlgoVision AI</h3>
                </div>
                <ul className="text-sm text-left space-y-2">
                  <li className="flex items-start">
                    <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mr-2 mt-0.5">1</span>
                    <span>Ask about a specific algorithm you want to learn</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mr-2 mt-0.5">2</span>
                    <span>Use the interactive controls to step through the visualization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mr-2 mt-0.5">3</span>
                    <span>Read the explanation for each step to understand what's happening</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mr-2 mt-0.5">4</span>
                    <span>Switch to the Code tab to see the implementation details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mr-2 mt-0.5">5</span>
                    <span>Compare algorithms to understand their differences</span>
                  </li>
                </ul>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <Button 
                    variant="secondary" 
                    className="w-full" 
                    onClick={() => setShowResources(true)}
                  >
                    Explore Learning Resources
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
