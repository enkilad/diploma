import { ObjectId } from 'mongoose';
import { Classification, IFileParsed } from '../interfaces/file.interface';
import { File } from '../models/file.model';

export const getFiles = () => {
  try {
    return File.find({});
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
    return await File.findByIdAndUpdate(
      id,
      { classification },
      { useFindAndModify: false, new: true }
    );
  } catch (error) {
    console.log(`error`, error);
  }
};
