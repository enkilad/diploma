import { Request, Response } from 'express';
import { uploadFilesMiddleware } from '../middlewares/upload.middleware';
import { readParseSaveFilesMiddleware } from '../middlewares/readParseSaveFiles.middleware';

const multipleUpload = async (req: Request, res: Response) => {
  try {
    await uploadFilesMiddleware(req, res);

    await readParseSaveFilesMiddleware(req.files as any).then((data) =>
      res.status(200).send({ data })
    );
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