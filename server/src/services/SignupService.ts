import User from '@database/entities/User';
import HttpException from '@errors/httpException';
import { getRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import UserProfile from '@database/entities/UserProfile';

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

class SignupService {
  private ormRepository: Repository<User>;
  private ormUserProfilesRepository: Repository<UserProfile>;

  constructor() {
    this.ormRepository = getRepository(User);
    this.ormUserProfilesRepository = getRepository(UserProfile);
  }

  public async execute({
    name,
    email,
    password,
    username,
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

    const profile = this.ormUserProfilesRepository.create({
      user_id: user.id,
      name,
    });

    await this.ormUserProfilesRepository.save(profile);

    return user;
  }
}

export default SignupService;
