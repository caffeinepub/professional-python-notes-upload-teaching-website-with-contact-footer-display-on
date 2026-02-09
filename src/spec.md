# Specification

## Summary
**Goal:** Add support for uploading, listing, viewing, and downloading PDF-based notes alongside existing text/markdown notes.

**Planned changes:**
- Extend the backend note model and APIs to support two note types: Text/Markdown and PDF (stored as binary), including an endpoint to upload PDF bytes with a title and to fetch PDF bytes by title.
- Add conditional backend state migration so existing stored text notes remain accessible after deploying the PDF-capable version.
- Update the upload UI to let users choose between uploading a Text/Markdown note or a PDF note, including .pdf-only validation and English error/success messaging.
- Update the notes list to indicate which notes are PDFs, and update the note detail view to embed an in-browser PDF preview and provide a download option for PDFs while keeping the existing text note view unchanged.
- Extend frontend React Query hooks and TypeScript types/bindings to support PDF upload and retrieval, with consistent cache invalidation after upload/delete for both note types.

**User-visible outcome:** Users can upload PDF notes (in addition to text/markdown notes), see which notes are PDFs in the list, open PDFs in an embedded viewer with a download option, and continue using all existing text note flows without regressions.
