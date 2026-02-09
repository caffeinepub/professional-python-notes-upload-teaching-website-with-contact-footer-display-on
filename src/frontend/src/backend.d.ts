import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Note {
    title: string;
    content: NoteType;
}
export type NoteType = {
    __kind__: "pdf";
    pdf: ExternalBlob;
} | {
    __kind__: "text";
    text: string;
};
export interface backendInterface {
    createPdfNote(title: string, pdfBlob: ExternalBlob): Promise<void>;
    createTextNote(title: string, content: string): Promise<void>;
    deleteNote(title: string): Promise<void>;
    downloadPdfNote(title: string): Promise<ExternalBlob>;
    getAllNotes(): Promise<Array<Note>>;
    viewNote(title: string): Promise<Note>;
}
