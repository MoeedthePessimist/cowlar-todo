import { Router } from 'express';

import todoRouter from './todo.routes';

const router: Router = Router();

router.use('/todos', todoRouter);

export default Router;
