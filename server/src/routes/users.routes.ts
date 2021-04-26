import { Router } from 'express';
import UserController from '@controllers/UserController';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';

const usersRoutes = Router();

usersRoutes.use(ensureAuthenticated);

usersRoutes.get('/', UserController.index);
usersRoutes.get('/:id', UserController.show);
usersRoutes.post('/', UserController.create);
usersRoutes.put('/:id/update', UserController.update);
usersRoutes.delete('/:id/delete', UserController.delete);

export default usersRoutes;
