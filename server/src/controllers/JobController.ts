import CreateJobService from '@services/CreateJobService';
import DeleteJobService from '@services/DeleteJobService';
import FindAllJobsService from '@services/FindAllJobsService';
import ShowJobService from '@services/ShowJobService';
import UpdateJobService from '@services/UpdateJobService';
import { Request, Response } from 'express';

class JobController {
  public async index(req: Request, res: Response) {
    const { id: user_id } = req.user;
    const jobs = new FindAllJobsService();

    const allJob = await jobs.execute({ user_id });

    return res.status(200).json(allJob);
  }

  public async create(req: Request, res: Response) {
    const { id: user_id } = req.user;
    const { name, daily_hours, total_hours } = req.body;

    const jobCreate = new CreateJobService();

    const job = await jobCreate.execute({
      name,
      daily_hours,
      total_hours,
      user_id,
    });

    return res.status(201).json(job);
  }

  public async show(req: Request, res: Response) {
    const { id: user_id } = req.user;
    const params = req.params;
    const id = Number(params.id);

    const showJobService = new ShowJobService();

    const job = await showJobService.execute({ id, user_id });

    return res.json(job);
  }

  public async update(req: Request, res: Response) {
    const { id: user_id } = req.user;
    const params = req.params;
    const id = Number(params.id);
    const { name, daily_hours, total_hours } = req.body;

    const updateJobService = new UpdateJobService();

    const job = await updateJobService.execute({
      id,
      user_id,
      name,
      daily_hours,
      total_hours,
    });

    return res.json(job);
  }

  public async delete(req: Request, res: Response) {
    const { id: user_id } = req.user;
    const params = req.params;
    const id = Number(params.id);

    const deleteJobService = new DeleteJobService();

    const job = await deleteJobService.execute({ id, user_id });

    return res.status(204).json(job);
  }
}

export default new JobController();
