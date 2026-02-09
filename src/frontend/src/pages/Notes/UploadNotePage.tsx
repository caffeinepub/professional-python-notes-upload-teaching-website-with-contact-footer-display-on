import { useState } from 'react';
import { useUploadTextNote, useUploadPdfNote } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, AlertCircle, FileText, FileUp } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { ExternalBlob } from '@/backend';

export function UploadNotePage() {
  const navigate = useNavigate();
  const uploadTextNote = useUploadTextNote();
  const uploadPdfNote = useUploadPdfNote();
  const [noteType, setNoteType] = useState<'text' | 'pdf'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState('');

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validation
    if (!title.trim()) {
      setValidationError('Title is required');
      return;
    }
    if (title.length > 200) {
      setValidationError('Title must be less than 200 characters');
      return;
    }
    if (!content.trim()) {
      setValidationError('Content is required');
      return;
    }
    if (content.length < 10) {
      setValidationError('Content must be at least 10 characters');
      return;
    }

    try {
      await uploadTextNote.mutateAsync({ title: title.trim(), content: content.trim() });
      toast.success('Note uploaded successfully');
      navigate({ to: '/notes' });
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to upload note';
      setValidationError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handlePdfSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validation
    if (!title.trim()) {
      setValidationError('Title is required');
      return;
    }
    if (title.length > 200) {
      setValidationError('Title must be less than 200 characters');
      return;
    }
    if (!pdfFile) {
      setValidationError('Please select a PDF file');
      return;
    }
    if (!pdfFile.name.toLowerCase().endsWith('.pdf')) {
      setValidationError('Only PDF files are allowed');
      return;
    }

    try {
      // Read file as ArrayBuffer and convert to Uint8Array
      const arrayBuffer = await pdfFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const pdfBlob = ExternalBlob.fromBytes(uint8Array);

      await uploadPdfNote.mutateAsync({ title: title.trim(), pdfBlob });
      toast.success('PDF note uploaded successfully');
      navigate({ to: '/notes' });
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to upload PDF note';
      setValidationError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setValidationError('Only PDF files are allowed');
        setPdfFile(null);
        return;
      }
      setPdfFile(file);
      setValidationError('');
    }
  };

  const isPending = uploadTextNote.isPending || uploadPdfNote.isPending;

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Upload Python Note</h1>
          <p className="text-muted-foreground">
            Share your Python knowledge with the community
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Note Details</CardTitle>
            <CardDescription>
              Choose between uploading a text/markdown note or a PDF document
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={noteType} onValueChange={(v) => setNoteType(v as 'text' | 'pdf')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">
                  <FileText className="mr-2 h-4 w-4" />
                  Text/Markdown
                </TabsTrigger>
                <TabsTrigger value="pdf">
                  <FileUp className="mr-2 h-4 w-4" />
                  PDF Document
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text">
                <form onSubmit={handleTextSubmit} className="space-y-6">
                  {validationError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{validationError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="text-title">Title *</Label>
                    <Input
                      id="text-title"
                      placeholder="e.g., Python List Comprehensions Explained"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={isPending}
                      maxLength={200}
                    />
                    <p className="text-xs text-muted-foreground">
                      {title.length}/200 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your note content here. You can include code examples, explanations, and tips..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      disabled={isPending}
                      rows={15}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum 10 characters. Current: {content.length}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="flex-1"
                    >
                      {isPending ? (
                        <>Uploading...</>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Note
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate({ to: '/notes' })}
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="pdf">
                <form onSubmit={handlePdfSubmit} className="space-y-6">
                  {validationError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{validationError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="pdf-title">Title *</Label>
                    <Input
                      id="pdf-title"
                      placeholder="e.g., Python Advanced Concepts Guide"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={isPending}
                      maxLength={200}
                    />
                    <p className="text-xs text-muted-foreground">
                      {title.length}/200 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pdf-file">PDF File *</Label>
                    <Input
                      id="pdf-file"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      disabled={isPending}
                      className="cursor-pointer"
                    />
                    {pdfFile && (
                      <p className="text-xs text-muted-foreground">
                        Selected: {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="flex-1"
                    >
                      {isPending ? (
                        <>Uploading...</>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload PDF
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate({ to: '/notes' })}
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mt-6 border-dashed">
          <CardHeader>
            <CardTitle className="text-lg">Tips for Great Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use clear, descriptive titles that explain the topic</li>
              <li>• For text notes: Include code examples with proper formatting</li>
              <li>• For PDF notes: Ensure the document is well-formatted and readable</li>
              <li>• Explain concepts in simple, beginner-friendly language</li>
              <li>• Break down complex topics into smaller sections</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
