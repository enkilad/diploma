import express from 'express';
import controller from '../controllers/document';

const router = express.Router();

router.post('/document', controller.createDocument);

export = router;
