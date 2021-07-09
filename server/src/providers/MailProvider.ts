import nodemailer, { Transporter } from 'nodemailer';
import MailTemplateProvider, {
  IParseMailTemplate,
} from './MailTemplateProvider';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

interface IMailProvider {
  sendMail(data: ISendMail): Promise<void>;
}

export default class MailProvider implements IMailProvider {
  private client: Transporter;

  private mailTemplateProvider = new MailTemplateProvider(); // :IMailProviderTemplate

  constructor() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '4c4792e1cdbb3e',
        pass: '71c06ee0081e8e',
      },
    });

    this.client = transporter;
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe JobsManager',
        address: from?.email || 'jobsmanager@support.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
