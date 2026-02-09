import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Note } from '../backend';
import { ExternalBlob } from '../backend';

export function useGetAllNotes() {
  const { actor, isFetching } = useActor();

  return useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNotes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetNote(title: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Note | null>({
    queryKey: ['note', title],
    queryFn: async () => {
      if (!actor || !title) return null;
      try {
        return await actor.viewNote(title);
      } catch (error) {
        console.error('Error fetching note:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!title,
  });
}

export function useUploadTextNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.createTextNote(title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export function useUploadPdfNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, pdfBlob }: { title: string; pdfBlob: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.createPdfNote(title, pdfBlob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export function useGetPdfNote(title: string) {
  const { actor, isFetching } = useActor();

  return useQuery<ExternalBlob | null>({
    queryKey: ['pdf', title],
    queryFn: async () => {
      if (!actor || !title) return null;
      try {
        return await actor.downloadPdfNote(title);
      } catch (error) {
        console.error('Error fetching PDF:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!title,
  });
}

export function useDeleteNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteNote(title);
    },
    onSuccess: (_data, title) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.removeQueries({ queryKey: ['note', title] });
      queryClient.removeQueries({ queryKey: ['pdf', title] });
    },
  });
}
