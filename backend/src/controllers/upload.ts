import { Request, Response } from 'express';
import { uploadFilesMiddleware } from '../middlewares/upload';
import { findClassification } from '../utils/parser';

const multipleUpload = async (req: Request, res: Response) => {
  try {
    const result = await uploadFilesMiddleware(req, res);
    console.log('result', result);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    return res.status(200).json({ message: 'Files are successfully loaded' });
  } catch (error) {
    console.log(error);

    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.send('Too many files to upload.');
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

export { multipleUpload };
