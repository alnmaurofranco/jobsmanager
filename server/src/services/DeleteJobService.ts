import { getCustomRepository } from 'typeorm';
import Job from '@database/entities/Job';
import HttpException from '@errors/httpException';
import { JobRepository } from '@database/repositories/JobRepository';

interface IRequest {
  id: number;
  user_id: string;
}

class DeleteJobService {
  private ormRepository = getCustomRepository(JobRepository);

  public async execute({ id, user_id }: IRequest): Promise<any> {
    const job = await this.ormRepository.findById(id, user_id);

    if (!job) {
      throw new HttpException(400, 'You dont permission for delete this job');
    }

    await this.ormRepository.remove(job);
  }
}

export default DeleteJobService;
