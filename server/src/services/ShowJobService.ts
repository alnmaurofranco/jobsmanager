import { getCustomRepository, getRepository, Repository } from 'typeorm';
import Job from '@database/entities/Job';
import HttpException from '@errors/httpException';
import { JobRepository } from '@database/repositories/JobRepository';

interface IRequest {
  user_id: string;
  id: number;
}

class ShowJobService {
  private ormRepository = getCustomRepository(JobRepository);

  constructor() {
    this.ormRepository;
  }

  public async execute({ id, user_id }: IRequest): Promise<Job> {
    const job = await this.ormRepository.findById(id, user_id);

    if (!job) {
      throw new HttpException(400, 'not possible found job!');
    }

    return job;
  }
}

export default ShowJobService;
