
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Algorithm } from '@/types/AlgorithmTypes';
import { ArrowRightLeft, Clock, BarChart, AlertTriangle, Check, X } from 'lucide-react';

interface AlgorithmComparisonProps {
  algorithms: Algorithm[];
}

const AlgorithmComparison: React.FC<AlgorithmComparisonProps> = ({ algorithms }) => {
  if (!algorithms || algorithms.length < 2) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Algorithm Comparison</CardTitle>
          <CardDescription>Select at least two algorithms to compare</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getStabilityInfo = (algorithm: Algorithm) => {
    const stableAlgorithms = ['merge-sort'];
    const unstableAlgorithms = ['quick-sort', 'heap-sort'];
    
    if (stableAlgorithms.includes(algorithm.id)) return true;
    if (unstableAlgorithms.includes(algorithm.id)) return false;
    
    // Default for algorithms where stability is not clearly defined
    return null;
  };

  const getInPlaceInfo = (algorithm: Algorithm) => {
    const inPlaceAlgorithms = ['bubble-sort', 'quick-sort', 'heap-sort'];
    const notInPlaceAlgorithms = ['merge-sort'];
    
    if (inPlaceAlgorithms.includes(algorithm.id)) return true;
    if (notInPlaceAlgorithms.includes(algorithm.id)) return false;
    
    // Default for algorithms where in-place property is not clearly defined
    return null;
  };

  const getAdaptiveInfo = (algorithm: Algorithm) => {
    const adaptiveAlgorithms = ['bubble-sort'];
    const notAdaptiveAlgorithms = ['merge-sort', 'quick-sort', 'heap-sort'];
    
    if (adaptiveAlgorithms.includes(algorithm.id)) return true;
    if (notAdaptiveAlgorithms.includes(algorithm.id)) return false;
    
    // Default for algorithms where adaptivity is not clearly defined
    return null;
  };

  const getBestUseCase = (algorithm: Algorithm) => {
    switch (algorithm.id) {
      case 'bubble-sort':
        return 'Small datasets, nearly sorted data';
      case 'quick-sort':
        return 'Large datasets, general-purpose sorting';
      case 'merge-sort':
        return 'Stable sorting, external sorting';
      case 'heap-sort':
        return 'Priority queue operations, large datasets';
      case 'binary-search':
        return 'Finding elements in sorted arrays';
      case 'binary-search-tree':
        return 'Dictionary operations, range queries';
      case 'breadth-first-search':
        return 'Shortest path in unweighted graphs, web crawling';
      case 'linked-list':
        return 'Dynamic memory allocation, frequent insertions/deletions';
      default:
        return 'General purpose use';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          Algorithm Comparison
        </CardTitle>
        <CardDescription>
          Comparing {algorithms.map(a => a.name).join(' vs ')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1"></div>
          {algorithms.map((algo, index) => (
            <div key={index} className="col-span-1 font-medium text-center">
              {algo.name}
            </div>
          ))}

          {/* Time Complexity */}
          <div className="col-span-1 flex items-center gap-2 font-medium">
            <Clock className="h-4 w-4 text-amber-400" />
            <span>Time Complexity</span>
          </div>
          {algorithms.map((algo, index) => (
            <div key={index} className="col-span-1 text-center">
              {algo.timeComplexity}
            </div>
          ))}

          {/* Space Complexity */}
          <div className="col-span-1 flex items-center gap-2 font-medium">
            <ArrowRightLeft className="h-4 w-4 text-green-400" />
            <span>Space Complexity</span>
          </div>
          {algorithms.map((algo, index) => (
            <div key={index} className="col-span-1 text-center">
              {algo.spaceComplexity}
            </div>
          ))}

          {/* Stability (for sorting algorithms) */}
          {algorithms.some(algo => algo.category === 'sorting') && (
            <>
              <div className="col-span-1 flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4 text-blue-400" />
                <span>Stable</span>
              </div>
              {algorithms.map((algo, index) => {
                const isStable = getStabilityInfo(algo);
                return (
                  <div key={index} className="col-span-1 text-center">
                    {isStable === null ? (
                      <span>N/A</span>
                    ) : isStable ? (
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* In-Place (for sorting algorithms) */}
          {algorithms.some(algo => algo.category === 'sorting') && (
            <>
              <div className="col-span-1 flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4 text-purple-400" />
                <span>In-Place</span>
              </div>
              {algorithms.map((algo, index) => {
                const isInPlace = getInPlaceInfo(algo);
                return (
                  <div key={index} className="col-span-1 text-center">
                    {isInPlace === null ? (
                      <span>N/A</span>
                    ) : isInPlace ? (
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* Adaptive (for sorting algorithms) */}
          {algorithms.some(algo => algo.category === 'sorting') && (
            <>
              <div className="col-span-1 flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <span>Adaptive</span>
              </div>
              {algorithms.map((algo, index) => {
                const isAdaptive = getAdaptiveInfo(algo);
                return (
                  <div key={index} className="col-span-1 text-center">
                    {isAdaptive === null ? (
                      <span>N/A</span>
                    ) : isAdaptive ? (
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* Best Use Case */}
          <div className="col-span-1 flex items-center gap-2 font-medium">
            <Check className="h-4 w-4 text-green-400" />
            <span>Best Used For</span>
          </div>
          {algorithms.map((algo, index) => (
            <div key={index} className="col-span-1 text-center text-sm">
              {getBestUseCase(algo)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmComparison;
