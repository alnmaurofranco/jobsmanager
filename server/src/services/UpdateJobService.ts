import { getCustomRepository, getRepository, Repository } from 'typeorm';
import Job from '@database/entities/Job';
import { JobRepository } from '@database/repositories/JobRepository';
import HttpException from '@errors/httpException';

interface IRequest {
  id: number;
  user_id: string;
  name: string;
  daily_hours: number;
  total_hours: number;
}

class UpdateJobService {
  private ormRepository = getCustomRepository(JobRepository);

  constructor() {
    this.ormRepository;
  }

  public async execute({
    id,
    user_id,
    name,
    daily_hours,
    total_hours,
  }: IRequest): Promise<Job> {
    const job = await this.ormRepository.findById(id, user_id);

    if (!job) {
      throw new HttpException(400, 'not possible found job!');
    }

    const findName = await this.ormRepository.findByName(name);

    if (findName && findName.id !== id) {
      throw new HttpException(
        400,
        'this name of project already did have usedied'
      );
    }

    job.name = name;
    job.daily_hours = daily_hours;
    job.total_hours = total_hours;

    await this.ormRepository.save(job);

    return job;
  }
}

export default UpdateJobService;
