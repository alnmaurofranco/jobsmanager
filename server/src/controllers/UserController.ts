import FindAllUsersService from '@services/FindAllUsersService';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import ShowUserService from '@services/ShowUserService';
import CreateUserService from '@services/CreateUserService';
import UpdateUserService from '@services/UpdateUserService';
import DeleteUserService from '@services/DeleteUserService';

class UserController {
  public async index(req: Request, res: Response) {
    const { id: user_id } = req.user;
    const usersService = new FindAllUsersService();

    const users = await usersService.execute(user_id);

    return res.json(classToClass(users));
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const showUserService = new ShowUserService();

    const user = await showUserService.execute({ id });

    return res.json(classToClass(user));
  }

  public async create(req: Request, res: Response) {
    const { username, email, password, confirm_password } = req.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      username,
      email,
      password,
      confirm_password,
    });

    return res.json(user);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email, password, old_password } = req.body;

    const updateUserService = new UpdateUserService();
    const user = await updateUserService.execute({
      id,
      email,
      username,
      old_password,
      password,
    });

    return res.json(user);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteUserService = new DeleteUserService();
    const user = await deleteUserService.execute({ id });

    return res.status(204).json(user);
  }
}

export default new UserController();
