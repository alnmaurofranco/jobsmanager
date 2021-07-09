interface IMailConfig {
  driver: 'mailtrap' | 'mailgun';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'mailtrap',
  defaults: {
    from: {
      email: 'alan@jobsmanager.com',
      name: 'Alan',
    },
  },
} as IMailConfig;
