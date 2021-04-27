import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import ShowProfileService from '@services/ShowProfileService';
import UpdateProfileService from '@services/UpdateProfileService';
import DesativedProfileService from '@services/DesativedProfileService';

class ProfileController {
  public async show(req: Request, res: Response) {
    const { id: user_id } = req.user;

    const showProfileService = new ShowProfileService();

    const profile = await showProfileService.execute({ user_id });

    return res.json(classToClass(profile));
  }

  public async update(req: Request, res: Response) {
    const { id: user_id } = req.user;
    const {
      username,
      name,
      avatar,
      email,
      old_password,
      password,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
    } = req.body;

    const updateProfileService = new UpdateProfileService();

    const profile = await updateProfileService.execute({
      user_id,
      username,
      name,
      avatar,
      email,
      old_password,
      password,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
    });

    return res.json(profile);
  }

  public async delete(req: Request, res: Response) {
    const { id: user_id } = req.user;

    const desativedProfileService = new DesativedProfileService();

    const profile = await desativedProfileService.execute({ user_id });

    return res.status(204).json(profile);
  }
}

export default new ProfileController();
