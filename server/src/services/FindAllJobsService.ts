import { getRepository, Repository } from 'typeorm';
import Job from '@database/entities/Job';
import HttpException from '@errors/httpException';

interface IRequest {
  user_id: string;
}

class FindAllJobsService {
  private ormRepository: Repository<Job>;

  constructor() {
    this.ormRepository = getRepository(Job);
  }

  public async execute({ user_id }: IRequest): Promise<Job[]> {
    const jobs = await this.ormRepository.find({
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
