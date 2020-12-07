import { EntityManager, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
  }

  private static getIdentityColumnNameByValue(value: number | string) {
    return typeof value === 'number' ? 'id' : isEmail(value) ? 'email' : 'username';
  }

  create(
    data: Pick<User, 'firstName' | 'lastName' | 'gender' | 'username' | 'email' | 'password'>,
    entityManager?: EntityManager,
  ): Promise<User> {
    const repository = entityManager?.getRepository(User) ?? this.userRepo;

    return repository.save(
      repository.create(data),
    );
  }

  update(
    criteria: User | number | number[],
    data: Partial<User>,
    entityManager?: EntityManager,
  ): Promise<UpdateResult> {
    const repository = entityManager?.getRepository(User) ?? this.userRepo;

    return repository.update(criteria, data);
  }

  findOne(identity: string | number): Promise<User> {
    return this.userRepo.findOne({
      where: {
        [UserService.getIdentityColumnNameByValue(identity)]: identity,
      },
    });
  }

  async userExists(identity: string | number): Promise<boolean> {
    return !!(
      await this.userRepo.findOne({
        where: {
          [UserService.getIdentityColumnNameByValue(identity)]: identity,
        },
        select: ['id'],
      })
    );
  }
}
