import { getCustomRepository } from 'typeorm';
import { JobRepository } from '@database/repositories/JobRepository';
import Job from '@database/entities/Job';
import HttpException from '@errors/httpException';

interface IRequest {
  name: string;
  daily_hours: number;
  total_hours: number;
  user_id: string;
}

class CreateJobService {
  private ormRepository = getCustomRepository(JobRepository);

  constructor() {
    this.ormRepository;
  }

  public async execute({
    name,
    daily_hours,
    total_hours,
    user_id,
  }: IRequest): Promise<Job> {
    const findJob = await this.ormRepository.findByName(name);

    if (findJob) {
      throw new HttpException(404, 'name for work used');
    }

    const job = this.ormRepository.create({
      name,
      daily_hours,
      total_hours,
      user_id,
    });

    await this.ormRepository.save(job);

    return job;
  }
}

export default CreateJobService;
