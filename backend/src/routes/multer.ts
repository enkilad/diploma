import express from 'express';
// import { home } from '../controllers/home';
import { multipleUpload } from '../controllers/upload';

const router = express.Router();

// router.get('/', home);

router.post('/multiple-upload', multipleUpload);

export = router;
