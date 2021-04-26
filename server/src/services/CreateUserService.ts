import User from '@database/entities/User';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

interface IRequest {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

class CreateUserService {
  private ormRepository = getCustomRepository(UserRepository);

  constructor() {
    this.ormRepository;
  }

  public async execute({
    username,
    email,
    password,
    confirm_password,
  }: IRequest): Promise<User> {
    const userAlready = await this.ormRepository.findOne({
      where: { email },
    });

    if (userAlready) {
      throw new HttpException(400, 'E-mail address already used');
    }

    if (password !== confirm_password) {
      throw new HttpException(400, 'Password incorret');
    }

    const hashedPass = bcrypt.hashSync(password, 8);

    const user = this.ormRepository.create({
      email,
      username,
      password: hashedPass,
    });

    await this.ormRepository.save(user);

    return user;
  }
}

export default CreateUserService;
