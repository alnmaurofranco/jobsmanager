import UserProfile from '@database/entities/UserProfile';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserProfile)
class UserProfileRepository extends Repository<UserProfile> {}

export { UserProfileRepository };
