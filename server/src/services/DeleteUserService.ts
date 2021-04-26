import User from '@database/entities/User';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteUserService {
  private ormRepository = getCustomRepository(UserRepository);

  constructor() {
    this.ormRepository;
  }

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.ormRepository.findById(id);

    if (!user) {
      throw new HttpException(400, 'not found user with id');
    }

    return await this.ormRepository.remove(user);
  }
}

export default DeleteUserService;
