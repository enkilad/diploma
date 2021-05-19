import { Request, Response } from 'express';
import { uploadFilesMiddleware } from '../middlewares/upload';
import { readParseSaveFiles } from '../middlewares/readParseSaveFiles';
import fs from 'fs';
import path from 'path';

const folderPath = `${__dirname}../../../public/docs`;

const multipleUpload = async (req: Request, res: Response) => {
  // delete all files that have been uploaded recently
  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(folderPath, file), (err) => {
        if (err) throw err;
      });
    }
  });

  try {
    await uploadFilesMiddleware(req, res);

    if (req.files.length <= 0) {
      return res
        .status(200)
        .json({ message: 'You must select at least 1 file.' });
    }

    readParseSaveFiles();

    return res.status(200).json({ message: 'Files are successfully loaded' });
  } catch (error) {
    console.log(error);

    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(500).json({ message: 'Too many files to upload' });
    }
    return res
      .status(500)
      .json({ message: `Error when trying upload many files: ${error}` });
  }
};

export { multipleUpload };
