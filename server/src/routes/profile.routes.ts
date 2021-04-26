import ProfileController from '@controllers/ProfileController';
import { Router } from 'express';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';

const profileRoutes = Router();

profileRoutes.use(ensureAuthenticated);

profileRoutes.get('/', ProfileController.show);
profileRoutes.put('/update', ProfileController.update);
profileRoutes.delete('/delete', ProfileController.delete);

export default profileRoutes;
