import { Request, Response } from 'express';
import { uploadFilesMiddleware } from '../middlewares/upload';

const multipleUpload = async (req: Request, res: Response) => {
  try {
    console.log(`req.body`, req.body);
    console.log(`req.files`, req.files);
    const result = await uploadFilesMiddleware(req, res);
    console.log('result', result);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    return res.status(200).json();
  } catch (error) {
    console.log(error);

    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.send('Too many files to upload.');
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

export { multipleUpload };
