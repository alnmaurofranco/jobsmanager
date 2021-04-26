import { getRepository, Repository } from 'typeorm';
import User from '@database/entities/User';
import HttpException from '@errors/httpException';

class FindAllUsersService {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async execute() {
    const users = await this.ormRepository.find({
      relations: ['jobs', 'profile'],
    });

    if (users.length === 0 || users.length <= 0) {
      throw new HttpException(404, 'not found users');
    }

    return users;
  }
}

export default FindAllUsersService;
