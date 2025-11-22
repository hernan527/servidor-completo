export interface UploadedFile {
    name: string;
    data: Buffer;
    encoding: string;
    mimetype: string;
    size: number;
    tempFilePath?: string;
    truncated?: boolean;
    md5?: string;
  }
  