import ProfileController from '@controllers/ProfileController';
import { Router } from 'express';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';

const profileRoutes = Router();

profileRoutes.use(ensureAuthenticated);

profileRoutes.get('/', ProfileController.show);
profileRoutes.put('/update', ProfileController.update);
profileRoutes.put('/update/password', ProfileController.updateToChangePassword);
profileRoutes.delete('/delete', ProfileController.delete);

export default profileRoutes;
