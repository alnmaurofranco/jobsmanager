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

export { remainingDays, calculateBudget };
