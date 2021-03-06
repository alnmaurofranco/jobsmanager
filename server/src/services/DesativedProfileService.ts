import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import User from '@database/entities/User';

interface IRequest {
  user_id: string;
}

class DesativedProfileService {
  private userRepository = getCustomRepository(UserRepository);

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepository.findUserById(user_id);

    if (!user) {
      throw new HttpException(400, 'User not found in system.');
    }

    user.active = false;
    user.updated_at = new Date(Date.now());

    await this.userRepository.save(user);

    return user;
  }
}

export default DesativedProfileService;
