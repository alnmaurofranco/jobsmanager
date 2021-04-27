interface IJob {
  total_hours: number;
  daily_hours: number;
  created_at: Date;
}

const remainingDays = (job: IJob) => {
  const remainingDaysInit = job.total_hours / job.daily_hours;

  const createdDate = new Date(job.created_at);
  const dueDay = createdDate.getDate() + Number(remainingDaysInit);
  const dueDate = createdDate.setDate(dueDay);

  const timeDiffInMs = dueDate - Date.now();
  // transfromar milli em dias
  const dayInMs = 1000 * 60 * 60 * 24;
  const dayDiff = Math.floor(timeDiffInMs / dayInMs);

  // restam x dias
  return dayDiff;
};

const calculateBudget = (job, value_hour: number) =>
  value_hour * job.total_hours;

const calculateValueHour = (
  vacationPerYear: number,
  hoursPerDay: number,
  daysPerWeek: number,
  monthlyBudget: number
) => {
  const weeksPerYear = 52;
  // remover férias para semanas em 1 mês
  const weeksPerMonth = (weeksPerYear - vacationPerYear) / 12;
  const weekTotalHours = hoursPerDay * daysPerWeek;
  // quantas horas por semana trabalhando
  // total de horas trabalhadas no mês
  const monthlyTotalHours = weekTotalHours * weeksPerMonth;
  // Valor da minha hora
  const valueHour = monthlyBudget / monthlyTotalHours;

  return valueHour;
};

export { remainingDays, calculateBudget, calculateValueHour };
