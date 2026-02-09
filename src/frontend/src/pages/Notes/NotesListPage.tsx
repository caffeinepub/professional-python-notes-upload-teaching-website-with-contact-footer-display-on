import { useGetAllNotes, useDeleteNote } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { FileText, Plus, Trash2, Eye } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

export function NotesListPage() {
  const navigate = useNavigate();
  const { data: notes, isLoading, error } = useGetAllNotes();
  const deleteNote = useDeleteNote();

  const handleDelete = async (title: string) => {
    try {
      await deleteNote.mutateAsync(title);
      toast.success('Note deleted successfully');
    } catch (err) {
      toast.error('Failed to delete note');
      console.error('Delete error:', err);
    }
  };

  const handleViewNote = (title: string) => {
    navigate({ to: '/notes/$title', params: { title } });
  };

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8 md:py-12">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Notes</CardTitle>
            <CardDescription>
              There was a problem loading the notes. Please try again later.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Python Notes</h1>
          <p className="text-muted-foreground">
            Browse and explore community-contributed Python notes
          </p>
        </div>
        <Button onClick={() => navigate({ to: '/upload' })}>
          <Plus className="mr-2 h-4 w-4" />
          Upload Note
        </Button>
      </div>

      {!notes || notes.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">No notes yet</h3>
            <p className="mb-6 text-center text-muted-foreground">
              Be the first to share your Python knowledge by uploading a note.
            </p>
            <Button onClick={() => navigate({ to: '/upload' })}>
              <Plus className="mr-2 h-4 w-4" />
              Upload Your First Note
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => {
            const isPdf = note.content.__kind__ === 'pdf';
            
            let description = 'Note content';
            if (isPdf) {
              description = 'PDF document';
            } else if (note.content.__kind__ === 'text') {
              const textContent = note.content.text;
              description = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
            }
            
            return (
              <Card key={note.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2 flex-1">{note.title}</CardTitle>
                    {isPdf && (
                      <Badge variant="secondary" className="shrink-0">
                        PDF
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="line-clamp-3">
                    {description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => handleViewNote(note.title)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={deleteNote.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Note</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{note.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(note.title)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
