export interface UploadToServerInterface {
    Location: string;
    Key: string;
}

export enum fileMimeType {
    PDF = 'application/pdf',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}
