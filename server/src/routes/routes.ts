import { Router } from 'express';
import SignupService from '@services/SignupService';
import SignService from '@services/SignService';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@database/repositories/UserRepository';
import { calculateBudget, remainingDays } from '@utils/JobUtils';

const routes = Router();

routes.get('/', (req, res) => res.render('index'));

routes
  .route('/sign')
  .get((req, res) => res.render('sign'))
  .post(async (req, res) => {
    const { email, password } = req.body;

    const signService = new SignService();

    const sign = await signService.execute({ email, password });

    req.user = {
      id: sign.id,
    };

    return res.redirect('/dashboard');
  });

routes
  .route('/signup')
  .get((req, res) => res.render('signup'))
  .post(async (req, res) => {
    const { name, username, email, password, confirm_password } = req.body;

    const signupService = new SignupService();

    await signupService.execute({
      name,
      email,
      password,
      username,
      confirm_password,
    });

    return res.redirect('/');
  });

routes.get('/dashboard', async (req, res) => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne(req.user, {
    relations: ['jobs', 'profile'],
  });

  const statusCount = {
    progress: 0,
    done: 0,
    total: user.jobs.length,
  };

  // total de horas por dia de cada job em progress
  let jobTotalHours = 0;

  const updatedJobs = user.jobs.map((job) => {
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
      budget: calculateBudget(job, user.profile.valeu_hour),
    };
  });

  // quantidade de horas que quero trabalhar (PROFILE)
  // MENOS
  // quantidade de horas / dia de cada job em "progress"
  const freeHours = user.profile.hours_per_day - jobTotalHours;

  res.render('dashboard', {
    jobs: updatedJobs,
    user,
    freeHours,
    statusCount,
  });
});

routes.get('/profile', async (req, res) => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne(req.user, {
    relations: ['jobs', 'profile'],
  });
  return res.render('profile', { user });
});

export default routes;
