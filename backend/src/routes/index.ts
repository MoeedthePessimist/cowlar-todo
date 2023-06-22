import { Router } from 'express';

// import { setResponseHeader } from '~/configs/app.config';

import todoRouter from './todo.routes';

const router: Router = Router();

// router.use(setResponseHeader);

router.use('/todos', todoRouter);

export default router;
