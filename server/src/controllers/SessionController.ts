import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import SignService from '@services/SignService';
import SignupService from '@services/SignupService';

class SessionController {
  public async sign(req: Request, res: Response) {
    const { email, password } = req.body;

    const signService = new SignService();

    const sign = await signService.execute({ email, password });

    return res.status(200).json(classToClass(sign));
  }

  public async signup(req: Request, res: Response) {
    const { name, username, email, password, confirm_password } = req.body;
    const urlBody = req.headers.host;

    const signupService = new SignupService();

    const signup = await signupService.execute({
      email,
      password,
      username,
      confirm_password,
      name,
      urlHostToSendMail: urlBody,
    });

    return res.status(200).json(classToClass(signup));
  }
}

export default new SessionController();
