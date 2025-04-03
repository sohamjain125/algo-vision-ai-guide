
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Heart, BookmarkIcon, MessageSquare, Award, Save } from 'lucide-react';
import { useAlgorithmProgress } from '@/hooks/useAlgorithmProgress';
import { useAuth } from '@/contexts/AuthContext';
import { Algorithm } from '@/types/AlgorithmTypes';

interface AlgorithmProgressProps {
  algorithm: Algorithm;
}

const AlgorithmProgress: React.FC<AlgorithmProgressProps> = ({ algorithm }) => {
  const { user } = useAuth();
  const { progress, loading, markAsCompleted, toggleFavorite, saveNotes } = useAlgorithmProgress(algorithm.id);
  const [notes, setNotes] = useState(progress?.notes || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Track Your Progress</CardTitle>
          <CardDescription>Sign in to save your notes and track progress.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => window.location.href = '/auth'}>
            Sign In
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const handleSaveNotes = async () => {
    setIsSaving(true);
    await saveNotes(algorithm.id, notes);
    setIsSaving(false);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between">
          <span>Your Progress</span>
          {progress?.completed && (
            <div className="flex items-center text-green-500 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Completed
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Your Notes</label>
          <Textarea
            placeholder="Add your notes about this algorithm..."
            className="min-h-[100px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSaveNotes} 
              disabled={isSaving}
              className="flex items-center"
            >
              <Save className="h-3.5 w-3.5 mr-1" />
              {isSaving ? "Saving..." : "Save Notes"}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button
          variant={progress?.favorite ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFavorite(algorithm.id)}
          disabled={loading}
          className="flex items-center"
        >
          <Heart className={`h-4 w-4 mr-1 ${progress?.favorite ? 'fill-current' : ''}`} />
          {progress?.favorite ? "Favorited" : "Add to Favorites"}
        </Button>

        {!progress?.completed && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => markAsCompleted(algorithm.id)}
            disabled={loading}
            className="flex items-center"
          >
            <Award className="h-4 w-4 mr-1" />
            Mark as Completed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AlgorithmProgress;
