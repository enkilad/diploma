import { Document } from 'mongoose';

export type Classification =
  | '1 - Специальные ПДн'
  | '2 - Биометрические ПДн'
  | '3 - Общедоступные ПДн'
  | '4 - Иные ПДн'
  | 'Неклассифицированный';

export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: BufferEncoding;
  mimetype: MimeType;
  buffer: Buffer;
  size: number;
}

export interface IFileParsed extends Document {
  file: Buffer;
  name: string;
  classification: Classification;
  extension: string;
}
