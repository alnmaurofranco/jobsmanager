import { Request, Response, Router } from 'express';
import dashboardRoutes from './dashboard.routes';
import jobRoutes from './job.routes';
import profileRoutes from './profile.routes';
import sessionRoutes from './session.routes';
import usersRoutes from './users.routes';
import emailRoutes from './email.routes';
import passwordRoutes from './password.routes';

const routesapi = Router();

routesapi.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'API REST - JobsManager 2021' });
});

routesapi.use('/session', sessionRoutes);
routesapi.use('/email', emailRoutes);
routesapi.use('/password', passwordRoutes);
routesapi.use('/dashboard', dashboardRoutes);
routesapi.use('/job', jobRoutes);
routesapi.use('/users', usersRoutes);
routesapi.use('/profile', profileRoutes);

export default routesapi;
