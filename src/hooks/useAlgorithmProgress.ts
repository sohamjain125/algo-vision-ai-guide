
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast'; 
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Algorithm } from '@/types/AlgorithmTypes';

interface AlgorithmProgress {
  id: string;
  algorithm_id: string;
  completed: boolean;
  favorite: boolean;
  notes: string | null;
  last_viewed_at: string;
}

export const useAlgorithmProgress = (algorithmId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<AlgorithmProgress | null>(null);
  const [favorites, setFavorites] = useState<Algorithm[]>([]);
  const [completedAlgorithms, setCompletedAlgorithms] = useState<string[]>([]);

  // Fetch progress for a specific algorithm
  useEffect(() => {
    if (user && algorithmId) {
      fetchProgress(algorithmId);
    }
  }, [user, algorithmId]);

  // Fetch all favorite and completed algorithms
  useEffect(() => {
    if (user) {
      fetchFavorites();
      fetchCompleted();
    }
  }, [user]);

  const fetchProgress = async (algId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user?.id)
        .eq('algorithm_id', algId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is the code for "no rows returned"
        throw error;
      }

      setProgress(data || null);
    } catch (error) {
      console.error('Error fetching algorithm progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_progress')
        .select('algorithm_id')
        .eq('user_id', user?.id)
        .eq('favorite', true);

      if (error) throw error;

      // For now, we're not actually loading the algorithm details
      // In a real app, you'd fetch the algorithm data based on these IDs
      setFavorites([]);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompleted = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_progress')
        .select('algorithm_id')
        .eq('user_id', user?.id)
        .eq('completed', true);

      if (error) throw error;

      setCompletedAlgorithms(data.map(item => item.algorithm_id));
    } catch (error) {
      console.error('Error fetching completed algorithms:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (algId: string, updates: Partial<Omit<AlgorithmProgress, 'id' | 'user_id' | 'algorithm_id'>>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to track your progress.",
        variant: "destructive",
      });
      return null;
    }

    try {
      setLoading(true);

      // Check if progress entry exists
      const { data: existingData } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('algorithm_id', algId)
        .single();

      let result;

      if (existingData) {
        // Update existing entry
        result = await supabase
          .from('user_progress')
          .update({
            ...updates,
            last_viewed_at: new Date().toISOString(),
          })
          .eq('id', existingData.id)
          .select()
          .single();
      } else {
        // Create new entry
        result = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            algorithm_id: algId,
            ...updates,
            last_viewed_at: new Date().toISOString(),
          })
          .select()
          .single();
      }

      if (result.error) throw result.error;

      setProgress(result.data);
      
      // Refresh lists if needed
      if ('favorite' in updates) fetchFavorites();
      if ('completed' in updates) fetchCompleted();

      return result.data;
    } catch (error: any) {
      toast({
        title: "Error updating progress",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (algId: string) => {
    return updateProgress(algId, { completed: true });
  };

  const toggleFavorite = async (algId: string) => {
    const newStatus = !progress?.favorite;
    return updateProgress(algId, { favorite: newStatus });
  };

  const saveNotes = async (algId: string, notes: string) => {
    return updateProgress(algId, { notes });
  };

  const updateViewTime = async (algId: string) => {
    return updateProgress(algId, {});
  };

  return {
    progress,
    loading,
    favorites,
    completedAlgorithms,
    markAsCompleted,
    toggleFavorite,
    saveNotes,
    updateViewTime,
  };
};
