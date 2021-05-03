import Job from '@database/entities/Job';
import { JobRepository } from '@database/repositories/JobRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  user_id: string;
}

class FindAllJobsService {
  private jobsRepository = getCustomRepository(JobRepository);

  public async execute({ user_id }: IRequest): Promise<Job[]> {
    const jobs = await this.jobsRepository.find({
      where: {
        user_id,
      },
    });

    if (jobs.length === 0 || jobs.length <= 0) {
      throw new HttpException(404, 'not found jobs');
    }

    return jobs;
  }
}

export default FindAllJobsService;
