import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import bcrypt from 'bcryptjs';
import User from '@database/entities/User';

interface IRequest {
  user_id: string;
  oldPassword: string;
  newPassword: string;
}

class UpdateUserPasswordService {
  private userRepository = getCustomRepository(UserRepository);

  public async execute({
    user_id,
    oldPassword,
    newPassword,
  }: IRequest): Promise<void> {
    const user = await this.userRepository.findUserById(user_id);

    if (!user) {
      throw new HttpException(
        401,
        'Only authenticated users can change password.'
      );
    }

    if (newPassword && !oldPassword) {
      throw new HttpException(
        400,
        'You need to inform the old password to set a new password'
      );
    }

    if (newPassword && oldPassword) {
      const checkOldPassword = bcrypt.compareSync(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new HttpException(400, 'Old password does not match.');
      }

      user.password = bcrypt.hashSync(newPassword, 8);
    }

    await this.userRepository.save(user);
  }
}

export default UpdateUserPasswordService;
