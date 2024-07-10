export interface UploadMediaAttachment {
    link: string;
    thumbnail?: string;
    metadata?: {
        size: number;
        duration?: number;
    };
}
