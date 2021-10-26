import { ObjectId } from 'mongoose';
import { Classification, IFileParsed } from '../interfaces/file.interface';
import { File } from '../models/file.model';

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
    return File.create(file);
  } catch (error) {
    console.log(`error`, error);
  }
};

export const updateFileClassification = async (
  id: ObjectId,
  classification: Classification
) => {
  try {
    await File.updateOne({ _id: id }, { classification });
  } catch (error) {
    console.log(`error`, error);
  }
};
