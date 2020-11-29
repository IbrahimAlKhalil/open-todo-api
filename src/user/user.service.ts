import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
  }

  create(data: Pick<User, 'firstName' | 'lastName' | 'gender' | 'username' | 'email' | 'password'>, entityManager?: EntityManager): Promise<User> {
    const repository = entityManager?.getRepository(User) || this.userRepo;

    return repository.save(
      repository.create(data),
    );
  }

  findOne(identity: string | number): Promise<User> {
    const findBy = typeof identity === 'number' ? 'id' : 'email';

    return this.userRepo.findOne({
      where: {
        [findBy]: identity,
      },
    });
  }
}
