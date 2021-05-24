import { Request, Response } from 'express';
import { updateFileClassification } from '../services/file.service';

const classificationChange = async (req: Request, res: Response) => {
  try {
    const { id, classification } = req.body;

    const data = await updateFileClassification(id, classification);

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};

export { classificationChange };
