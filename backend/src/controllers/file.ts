import { NextFunction, Request, Response } from 'express';
import { File } from '../models/file';
import mongoose from 'mongoose';
import fs from 'fs';
import textract from 'textract';
import { findClassification } from '../utils/parser';

const saveFile = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`req.body`, req.body);
  const { name, category, classification } = req.body;

  const doc = new File({
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

(() => {
  const folderPath = `${__dirname}../../../public/docs`;
  fs.readdir(folderPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // read every file and show its text to console
    data.map((file) =>
      textract.fromFileWithPath(`${folderPath}/${file}`, (err, text) => {
        if (err) console.log(`err`, err);
        // console.log(`\n${file}\n`, text);
        findClassification(text, file);
      })
    );
  });
})();

export default { saveFile };
