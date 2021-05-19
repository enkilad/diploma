import mongoose, { Schema, Document } from 'mongoose';

interface IFile extends Document {
  name: string;
  classification: string;
  extension: string;
}

const FileSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    classification: { type: String, required: false },
    extension: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const File = mongoose.model<IFile>('File', FileSchema);
