import { File, IFileParsed } from '../models/file';
import util from 'util';
import mongoose from 'mongoose';
import textract from 'textract';
import { findClassification } from '../utils/parser';
import { saveFile } from '../services/file.service';

export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: BufferEncoding;
  mimetype: MimeType;
  buffer: Buffer;
  size: number;
}

const readParseSaveFiles = (files: IFile[]) => {
  // const parsedFiles: IFileParsed[] = [];

  const a = files.map(async (file: IFile) => {
    const { originalname, buffer } = file;

    textract.fromBufferWithName(originalname, buffer, async (err, text) => {
      if (err) console.log(`err`, err);

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

      saveFile(obj);
      // parsedFiles.push(obj);
    });
  });
  console.log(`a`, a)
  return a;
  // console.log(`parsedFiles`, parsedFiles);
  // return parsedFiles;
};

const readParseSaveFilesMiddleware = util.promisify(readParseSaveFiles);
export { readParseSaveFilesMiddleware };
