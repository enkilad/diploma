import { Query } from 'mongoose';
import { File, IFileParsed } from '../models/file';

export const getFiles = () => {
  try {
    return File.find((err, files) => files);
  } catch (error) {
    console.log(`error`, error);
    return error;
  }
};

export const saveFile = (file: IFileParsed) => {
  try {
    return File.create(file, (err, newFile) => {
      console.log(`err`, err);
    });
  } catch (error) {
    console.log(`error`, error);
  }
};
