import util from 'util';
import path from 'path';
import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback) => {
    callback(null, `${__dirname}../../../public/docs`);
  },
  filename: (req: Request, file: Express.Multer.File, callback) => {
    // const match = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', ''];

    // if (match.indexOf(file.mimetype) === -1) {
    //   const message = `${file.originalname} is invalid. Only accept .txt, .doc, .docx, .xlsx, .ppt, .pptx, .pdf.`;
    //   return callback(message as any, null as any);
    // }

    const filename = file.originalname;
    callback(null, Date.now() + '-' + filename);
  },
});

const uploadFiles = multer({ storage: storage }).array('multiple-files', 10);
const uploadFilesMiddleware = util.promisify(uploadFiles);

export { uploadFilesMiddleware };
