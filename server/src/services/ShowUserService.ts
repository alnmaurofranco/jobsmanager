import User from '@database/entities/User';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowUserService {
  private usersRepository = getCustomRepository(UserRepository);

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpException(400, 'not found user with id');
    }

    return user;
  }
}

export default ShowUserService;
