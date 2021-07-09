import { Request, Response } from 'express';
import EmailConfirmationProfileService from '@services/EmailConfirmationProfileService';

class EmailConfirmationProfileController {
  public async show(req: Request, res: Response) {
    const q = req.query;
    const token = q.token as string;

    const emailConfirmation = new EmailConfirmationProfileService();

    await emailConfirmation.execute({ token });

    return res.status(204).json();
  }
}

export default new EmailConfirmationProfileController();
