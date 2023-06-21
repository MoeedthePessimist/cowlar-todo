import { Router } from 'express';
import TodoController from '~/controllers/todo.controller';

const router: Router = Router();

const Controller = new TodoController();

router.get('/', Controller.getTodos);

router.post('/', Controller.addTodo);

router.patch('/:id', Controller.updateTodo);

router.delete('/:id', Controller.deleteTodo);

export default router;
