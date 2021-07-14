import User from '@database/entities/User';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteUserService {
  private userRepository = getCustomRepository(UserRepository);

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new HttpException(400, 'not found user with id');
    }

    return await this.userRepository.remove(user);
  }
}

export default DeleteUserService;
