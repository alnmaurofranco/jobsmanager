import Job from '@database/entities/Job';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Job)
class JobRepository extends Repository<Job> {
  public async findByName(name: string): Promise<Job | undefined> {
    const job = await this.findOne({
      where: {
        name,
      },
    });

    return job;
  }

  public async findUserById(user_id: string): Promise<Job | undefined> {
    const job = await this.findOne({
      where: {
        user_id,
      },
    });

    return job;
  }

  public async findById(id: number, user_id: string): Promise<Job | undefined> {
    const job = await this.findOne({
      where: {
        id,
        user_id,
      },
    });

    return job;
  }
}

export { JobRepository };
