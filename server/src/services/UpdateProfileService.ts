import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  username?: string;
  name?: string;
  avatar?: string;
  email?: string;
  old_password?: string;
  password?: string;
}

class UpdateProfileService {
  private ormRepository = getCustomRepository(UserRepository);

  constructor() {
    this.ormRepository;
  }

  public async execute({
    user_id,
    username,
    name,
    avatar,
    email,
    old_password,
    password,
  }: IRequest): Promise<any> {
    const user = await this.ormRepository.findUserById(user_id);

    if (!user) {
      throw new HttpException(400, 'User not found in system.');
    }

    const userWithEmail = await this.ormRepository.findByEmail(email);

    if (userWithEmail && userWithEmail.id !== user_id) {
      throw new HttpException(400, 'E-mail already in use.');
    }

    user.username = username;
    user.email = email;
    user.profile.name = name;
    user.profile.avatar = avatar;

    if (password && !old_password) {
      throw new HttpException(
        400,
        'You need to inform the old password to set a new password'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, password);

      if (checkOldPassword) {
        throw new HttpException(400, 'Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    return this.ormRepository.save(user);
  }
}

export default UpdateProfileService;
