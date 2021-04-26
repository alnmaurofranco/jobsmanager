import { Router } from 'express';
import DashboardController from '@controllers/DashboardController';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';

const dashboardRoutes = Router();

dashboardRoutes.use(ensureAuthenticated);

dashboardRoutes.get('/', DashboardController.index);

export default dashboardRoutes;
