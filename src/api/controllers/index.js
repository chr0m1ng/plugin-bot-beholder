import { Router } from 'express';
import commands_router from './commands-controller';

const router = Router();

router.use('/commands', commands_router);

export default router;
