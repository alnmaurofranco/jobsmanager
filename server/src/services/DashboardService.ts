import Job from '@database/entities/Job';
import User from '@database/entities/User';
import HttpException from '@errors/httpException';
import { calculateBudget, remainingDays } from '@utils/JobUtils';
import { getRepository, Repository } from 'typeorm';

interface IRequest {
  user_id: string;
}

interface IResponse {
  jobs: Job[];
  statusCount: Object;
  freeHours: number;
  //profile: {};
}

class DashboardService {
  private ormRepository: Repository<Job>;
  private ormUsersRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(Job);
    this.ormUsersRepository = getRepository(User);
  }

  public async execute({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.ormUsersRepository.findOne({
      where: {
        id: user_id,
      },
      relations: ['profile'],
    });

    if (!user) {
      throw new HttpException(404, 'user not found!');
    }

    const jobs = await this.ormRepository.find({
      where: {
        user_id: user.id,
      },
    });

    // if (jobs.length === 0 || jobs.length <= 0) {
    //   throw new HttpException(404, 'not found jobs');
    // }

    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    // total de horas por dia de cada job em progress
    let jobTotalHours: number = 0;

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
      //profile: user.profile,
    };
  }
}

export default DashboardService;
