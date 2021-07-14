import { Request, Response } from 'express';
import SendForgotPasswordService from '@services/SendForgotPasswordService';
import ResetPasswordService from '../services/ResetPasswordService';

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
    const { token, newPassword } = req.body;

    const resetPasswordService = new ResetPasswordService();

    const resetPassword = await resetPasswordService.execute({
      token,
      newPassword,
    });

    return res.status(200).json(resetPassword);
  }
}

export default new ForgotPasswordController();
