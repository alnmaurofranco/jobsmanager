import Job from '@database/entities/Job';
import { JobRepository } from '@database/repositories/JobRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';
import RedisCache from '../implementations/RedisCache';

interface IRequest {
  name: string;
  daily_hours: number;
  total_hours: number;
  user_id: string;
}

class CreateJobService {
  private jobsRepository = getCustomRepository(JobRepository);
  private cacheProvider = new RedisCache();

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
    await this.cacheProvider.invalidatePrefix('jobs-list');

    return job;
  }
}

export default CreateJobService;
