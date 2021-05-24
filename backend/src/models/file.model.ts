import mongoose, { Schema } from 'mongoose';
import { IFileParsed } from '../interfaces/file.interface';

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
