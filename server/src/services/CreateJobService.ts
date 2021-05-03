import Job from '@database/entities/Job';
import { JobRepository } from '@database/repositories/JobRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  name: string;
  daily_hours: number;
  total_hours: number;
  user_id: string;
}

class CreateJobService {
  private jobsRepository = getCustomRepository(JobRepository);

  public async execute({
    name,
    daily_hours,
    total_hours,
    user_id,
  }: IRequest): Promise<Job> {
    const findJob = await this.jobsRepository.findByName(name);

    if (findJob) {
      throw new HttpException(404, 'name for work used');
    }

    const job = this.jobsRepository.create({
      name,
      daily_hours,
      total_hours,
      user_id,
    });

    await this.jobsRepository.save(job);

    return job;
  }
}

export default CreateJobService;
