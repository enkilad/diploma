import express from 'express';
import controller from '../controllers/file';

const router = express.Router();

router.post('/file', controller.saveFile);

export = router;
