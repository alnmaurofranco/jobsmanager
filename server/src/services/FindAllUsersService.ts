import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';

class FindAllUsersService {
  private usersRepository = getCustomRepository(UserRepository);

  public async execute() {
    const users = await this.usersRepository.find({
      relations: ['jobs', 'profile'],
    });

    if (users.length === 0 || users.length <= 0) {
      throw new HttpException(404, 'not found users');
    }

    return users;
  }
}

export default FindAllUsersService;
