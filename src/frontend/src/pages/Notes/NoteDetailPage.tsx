import { useGetNote, useGetPdfNote, useDeleteNote } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, Trash2, Download } from 'lucide-react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

export function NoteDetailPage() {
  const navigate = useNavigate();
  const { title } = useParams({ from: '/notes/$title' });
  const { data: note, isLoading, error } = useGetNote(title);
  const deleteNote = useDeleteNote();
  
  const isPdfNote = note?.content.__kind__ === 'pdf';
  const { data: pdfBlob } = useGetPdfNote(isPdfNote ? title : '');
  const [pdfUrl, setPdfUrl] = useState<string>('');

  useEffect(() => {
    if (pdfBlob) {
      const url = pdfBlob.getDirectURL();
      setPdfUrl(url);
    }
  }, [pdfBlob]);

  const handleDelete = async () => {
    try {
      await deleteNote.mutateAsync(title);
      toast.success('Note deleted successfully');
      navigate({ to: '/notes' });
    } catch (err) {
      toast.error('Failed to delete note');
      console.error('Delete error:', err);
    }
  };

  const handleDownload = async () => {
    if (!pdfBlob) return;
    
    try {
      const bytes = await pdfBlob.getBytes();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('PDF downloaded successfully');
    } catch (err) {
      toast.error('Failed to download PDF');
      console.error('Download error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <Skeleton className="mb-6 h-10 w-32" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="container py-8 md:py-12">
        <Button variant="ghost" onClick={() => navigate({ to: '/notes' })} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Notes
        </Button>
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Note Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The note you're looking for doesn't exist or has been deleted.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate({ to: '/notes' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Notes
        </Button>
        <div className="flex gap-2">
          {isPdfNote && pdfBlob && (
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={deleteNote.isPending}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Note
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
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-3xl flex-1">{note.title}</CardTitle>
            {isPdfNote && (
              <Badge variant="secondary" className="text-base">
                PDF
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {note.content.__kind__ === 'text' ? (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap rounded-lg bg-muted p-6 text-sm leading-relaxed">
                {note.content.text}
              </pre>
            </div>
          ) : note.content.__kind__ === 'pdf' && pdfUrl ? (
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/50 overflow-hidden" style={{ height: '80vh' }}>
                <iframe
                  src={pdfUrl}
                  className="w-full h-full"
                  title={`PDF: ${note.title}`}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">Loading PDF...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
