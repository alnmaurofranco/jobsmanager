import { Request, Response, Router } from 'express';
import dashboardRoutes from './dashboard.routes';
import jobRoutes from './job.routes';
import profileRoutes from './profile.routes';
import sessionRoutes from './session.routes';
import usersRoutes from './users.routes';

const routesapi = Router();

routesapi.get('/', (_req: Request, res: Response) => {
  return res.json({ message: 'Welcome to Generator NodeJS API' });
});

routesapi.use('/session', sessionRoutes);
routesapi.use('/dashboard', dashboardRoutes);
routesapi.use('/job', jobRoutes);
routesapi.use('/users', usersRoutes);
routesapi.use('/profile', profileRoutes);

export default routesapi;
