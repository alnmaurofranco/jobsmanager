import Job from '@database/entities/Job';
import { JobRepository } from '@database/repositories/JobRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';
import RedisCache from '../implementations/RedisCache';

interface IRequest {
  user_id: string;
}

class FindAllJobsService {
  private jobsRepository = getCustomRepository(JobRepository);

  private cacheProvider = new RedisCache();

  public async execute({ user_id }: IRequest): Promise<Job[]> {
    let jobs = await this.cacheProvider.recover<Job[]>(`jobs-list:${user_id}`);

    if (!jobs) {
      jobs = await this.jobsRepository.find({
        where: {
          user_id,
        },
      });

      if (jobs.length === 0 || jobs.length <= 0) {
        throw new HttpException(404, 'not found jobs');
      }

      await this.cacheProvider.save(`jobs-list:${user_id}`, jobs);
    }

    return jobs;
  }
}

export default FindAllJobsService;
