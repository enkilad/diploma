import { File } from '../models/file.model';
import mongoose from 'mongoose';
import textract from 'textract';
import { findClassification } from '../utils/parser';
import { saveFile } from '../services/file.service';
import { IFile, IFileParsed } from '../interfaces/file.interface';

const promisify = (originalname: string, buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    textract.fromBufferWithName(originalname, buffer, async (err, text) => {
      const { name, classification, extension } = findClassification(
        text,
        originalname
      );

      const obj = new File({
        _id: new mongoose.Types.ObjectId(),
        file: buffer,
        name,
        classification,
        extension,
      });

      resolve(obj);
    });
  });
};

const readParseSaveFilesMiddleware = async (files: IFile[]) => {
  const promisesArr = files.map((file) => {
    const { originalname, buffer } = file;

    return promisify(originalname, buffer);
  });

  const objectsArr: any = await Promise.all(promisesArr);

  objectsArr.forEach((o: IFileParsed) => saveFile(o));

  return objectsArr;
};

export { readParseSaveFilesMiddleware };
