import express from 'express';
import { classificationChange } from '../controllers/classification.controller';

const router = express.Router();

router.put('/classification', classificationChange);

export = router;
