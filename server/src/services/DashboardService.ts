import Job from '@database/entities/Job';
import { JobRepository } from '@database/repositories/JobRepository';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { calculateBudget, remainingDays } from '@utils/JobUtils';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  user_id: string;
}

interface IResponse {
  jobs: Job[];
  statusCount: {
    progress: number;
    done: number;
    total: number;
  };
  freeHours: number;
}

class DashboardService {
  private jobsRepository = getCustomRepository(JobRepository);

  private usersRepository = getCustomRepository(UserRepository);

  public async execute({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByRelations(user_id);

    if (!user) {
      throw new HttpException(404, 'user not found!');
    }

    const jobs = await this.jobsRepository.find({
      where: {
        user_id: user.id,
      },
    });

    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    // total de horas por dia de cada job em progress
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      const remaining = remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress';
      // status = done
      // statusCount[done] +=1
      // Somando a quantidade de status
      statusCount[status] += 1;
      // depois vai pelo "done" no objeto statusCount e acrescenta 1

      // total de horas por dia por job em progress
      jobTotalHours =
        status === 'progress'
          ? (jobTotalHours += Number(job.daily_hours))
          : jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: calculateBudget(job, user.profile.value_hour),
      };
    });

    // quantidade de horas que quero trabalhar (PROFILE)
    // MENOS
    // quantidade de horas / dia de cada job em "progress"
    const freeHours = user.profile.hours_per_day - jobTotalHours;

    return {
      jobs: updatedJobs,
      statusCount,
      freeHours,
    };
  }
}

export default DashboardService;
