import util from 'util';
import multer from 'multer';

const storage = multer.memoryStorage();

const uploadFiles = multer({ storage: storage }).array('multiple-files', 10);
const uploadFilesMiddleware = util.promisify(uploadFiles);

export { uploadFilesMiddleware };
