import { Router } from 'express';
import { processCommandAsync } from '../services/commands-service';

const router = Router();

router.post('/', async (req, res) => {
    const { tenant, authorization } = req.headers;
    const command_res = await processCommandAsync(
        req.body,
        tenant,
        authorization
    );

    return res.send(command_res);
});

export default router;
