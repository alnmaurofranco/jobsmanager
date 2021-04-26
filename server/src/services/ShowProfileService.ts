import { getRepository, Repository } from 'typeorm';
import User from '@database/entities/User';
import HttpException from '@errors/httpException';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.ormRepository.findOne({
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
