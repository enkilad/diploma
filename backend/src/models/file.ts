import mongoose, { Schema, Document } from 'mongoose';

export interface IFileParsed extends Document {
  file: Buffer;
  name: string;
  classification: string;
  extension: string;
}

const FileSchema: Schema = new Schema(
  {
    file: { type: Buffer, required: true },
    name: { type: String, required: true },
    classification: { type: String, required: false },
    extension: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const File = mongoose.model<IFileParsed>('File', FileSchema);
