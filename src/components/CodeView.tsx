
import React from 'react';
import { Algorithm } from '@/types/AlgorithmTypes';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ClipboardCopyIcon } from 'lucide-react';

interface CodeViewProps {
  algorithm: Algorithm;
}

const CodeView: React.FC<CodeViewProps> = ({ algorithm }) => {
  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(algorithm.code);
    toast({
      title: "Code copied",
      description: "The algorithm code has been copied to your clipboard."
    });
  };

  return (
    <div className="relative">
      <div className="absolute top-2 right-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCopyCode}
          title="Copy code"
        >
          <ClipboardCopyIcon className="h-4 w-4" />
        </Button>
      </div>
      <pre className="relative">
        <code className="hljs language-javascript">
          {algorithm.code}
        </code>
      </pre>
      
      <div className="mt-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Time Complexity</h3>
          <p className="text-sm text-muted-foreground">{algorithm.timeComplexity}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1">Space Complexity</h3>
          <p className="text-sm text-muted-foreground">{algorithm.spaceComplexity}</p>
        </div>
      </div>
    </div>
  );
};

export default CodeView;
