import { Router } from 'express';

import SessionController from '@controllers/SessionController';

const sessionRoutes = Router();

sessionRoutes.post('/sign', SessionController.sign);
sessionRoutes.post('/signup', SessionController.signup);

export default sessionRoutes;
