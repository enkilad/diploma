import express from 'express';
import { multipleUpload } from '../controllers/upload.controller';

const router = express.Router();

router.post('/multiple-upload', multipleUpload);

export = router;
