import { Router } from 'express';
import ForgotPasswordController from '@controllers/ForgotPasswordController';

const passwordRoutes = Router();

passwordRoutes.post('/forgot', ForgotPasswordController.create);
passwordRoutes.post('/reset', ForgotPasswordController.update);

export default passwordRoutes;
