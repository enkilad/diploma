import mongoose, { Schema, Document } from 'mongoose';

interface IFile extends Document {
  name: string;
  classification?: string;
  category?: string;
}

const FileSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    classification: { type: String, required: false },
    category: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const File = mongoose.model<IFile>('File', FileSchema);
