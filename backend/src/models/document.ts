import mongoose, { Schema } from 'mongoose';

interface IDocument {
  id: number;
  name: string;
  classification?: string;
  category?: string;
}

const DocumentSchema: Schema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    classification: { type: String, required: false },
    category: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const Document = mongoose.model<IDocument>('Document', DocumentSchema);
