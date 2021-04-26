import JobController from '@controllers/JobController';
import { Router } from 'express';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';

const jobRoutes = Router();

jobRoutes.use(ensureAuthenticated);

jobRoutes.get('/', JobController.index);
jobRoutes.get('/:id', JobController.show);
jobRoutes.post('/', JobController.create);
jobRoutes.put('/:id/update', JobController.update);
jobRoutes.delete('/:id/delete', JobController.delete);

export default jobRoutes;
