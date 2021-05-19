import { File } from '../models/file';
import mongoose from 'mongoose';
import fs from 'fs';
import textract from 'textract';
import { findClassification } from '../utils/parser';

const readParseSaveFiles = () => {
  const folderPath = `${__dirname}../../../public/docs`;

  fs.readdir(folderPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // read every file and show its text to console
    data.map((file) => {
      textract.fromFileWithPath(`${folderPath}/${file}`, async (err, text) => {
        if (err) console.log(`err`, err);

        const { name, classification, extension } = findClassification(
          text,
          file
        );

        const obj = new File({
          _id: new mongoose.Types.ObjectId(),
          name,
          classification,
          extension,
        });

        try {
          await obj.save();
        } catch (error) {
          console.log(`error`, error);
        }
      });
    });
  });
};

export { readParseSaveFiles };
