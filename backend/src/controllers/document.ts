import { NextFunction, Request, Response } from 'express';
import { Document } from '../models/document';
import mongoose from 'mongoose';

const createDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, category, classification } = req.body;

  const doc = new Document({
    _id: new mongoose.Types.ObjectId(),
    name,
    category,
    classification,
  });

  try {
    const result = await doc.save();
    return res.status(201).json({
      doc: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export default { createDocument };
