import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { VerificationService } from '../verification/verification.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly bcryptService: BcryptService,
    private readonly connection: Connection,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async hashPassword(entity: User): Promise<void> {
    entity.password = await this.bcryptService.hash(entity.password);
  }

  beforeInsert(event: InsertEvent<User>): Promise<void> {
    return this.hashPassword(event.entity);
  }

  async beforeUpdate({ entity, databaseEntity }: UpdateEvent<User>): Promise<void> {
    if (entity.password !== databaseEntity?.password) {
      await this.hashPassword(entity);
    }
  }

  async afterInsert({ entity }: InsertEvent<User>): Promise<void> {
    await this.verificationService.send(entity);
  }
}