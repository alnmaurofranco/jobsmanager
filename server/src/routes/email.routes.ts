import { Router } from 'express';
import EmailVerificationController from '@controllers/EmailVerificationController';

const emailRoutes = Router();

emailRoutes.get(
  '/account/confirmation?:token',
  EmailVerificationController.show
);

export default emailRoutes;
