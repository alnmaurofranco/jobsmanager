import { Request, Response } from 'express';
import FindAllJobsService from '@services/FindAllJobsService';
import { calculateBudget, remainingDays } from '../utils/JobUtils';
import DashboardService from '@services/DashboardService';

class DashboardController {
  public async index(req: Request, res: Response) {
    const { id: user_id } = req.user;

    const dashboardService = new DashboardService();

    const jobs = await dashboardService.execute({ user_id });

    return res.json(jobs);
  }
}

export default new DashboardController();
