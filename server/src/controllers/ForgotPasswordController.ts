import { Request, Response } from 'express';
import SendForgotPasswordService from '@services/SendForgotPasswordService';

class ForgotPasswordController {
  public async create(req: Request, res: Response) {
    const { email } = req.body;
    const urlBody = req.headers.host;

    const forgotPassword = new SendForgotPasswordService();

    await forgotPassword.execute({
      email,
      urlHostToSendMail: urlBody,
    });

    return res.status(200).json();
  }

  // public async show(req: Request, res: Response) {
  //   const { token } = req.query;

  //   console.log(token);
  // }

  public async update(req: Request, res: Response) {
    const { token, newPassword, confirmNewPassword } = req.body;

    const data = {
      token,
      newPassword,
      confirmNewPassword,
    };

    return res.status(200).json({ data });
  }
}

export default new ForgotPasswordController();
