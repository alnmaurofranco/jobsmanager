import { getCustomRepository, getRepository, Repository } from 'typeorm';
import Job from '@database/entities/Job';
import HttpException from '@errors/httpException';
import { JobRepository } from '@database/repositories/JobRepository';
import { calculateBudget } from '@utils/JobUtils';
import { UserRepository } from '@database/repositories/UserRepository';

interface IRequest {
  user_id: string;
  id: number;
}

interface IResponse {
  job: Job;
  budget: number;
}

class ShowJobService {
  private jobsRepository = getCustomRepository(JobRepository);
  private usersRepository = getCustomRepository(UserRepository);

  public async execute({ id, user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByRelations(user_id);

    if (!user) {
      throw new HttpException(404, 'user not found!');
    }

    const job = await this.jobsRepository.findById(id, user_id);

    if (!job) {
      throw new HttpException(400, 'not possible found job!');
    }

    return {
      job,
      budget: calculateBudget(job, user.profile.value_hour),
    };
  }
}

export default ShowJobService;
