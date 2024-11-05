import { Router } from 'express';
import { getExample } from '../controllers/exampleController';
import { unitsController } from '../controllers/unitsController';

const router = Router();

router.post('/', unitsController);

export default router;