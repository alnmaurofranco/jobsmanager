import User from '@database/entities/User';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  private usersRepository = getCustomRepository(UserRepository);

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: user_id },
      relations: ['profile'],
    });

    if (!user) {
      throw new HttpException(404, 'user not found!');
    }

    return user;
  }
}

export default ShowProfileService;
