import { VerificationService } from '../verification/verification.service';
import { Connection, InsertEvent, UpdateEvent } from 'typeorm';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserSubscriber } from './user.subscriber';
import { Gender, User } from './user.entity';

describe('UserSubscriber', () => {
  let verificationService: VerificationService;
  let subscriber: UserSubscriber;

  const entity = {
    firstName: 'Ibrahim',
    lastName: 'Al Khalil',
    username: 'IbrahimAlKhalil',
    email: 'dummyemail@dummy.com',
    password: '!234567$',
    gender: Gender.male,
  };
  const hash = '23lkfdf';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSubscriber,
        {
          provide: Connection,
          useValue: {
            subscribers: [],
          },
        },
        {
          provide: BcryptService,
          useValue: {
            hash: jest.fn(() => Promise.resolve(hash)),
          },
        },
        {
          provide: VerificationService,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    verificationService = module.get(VerificationService);
    subscriber = module.get(UserSubscriber);
  });

  describe('UserSubscriber', () => {
    describe('.beforeInsert()', () => {
      it('should hash the password', async () => {
        await subscriber.beforeInsert({ entity } as InsertEvent<User>);

        expect(entity.password).toEqual(hash);
      });
    });

    describe('.beforeUpdate()', () => {
      it('should not hash the password', async () => {
        await subscriber.beforeUpdate(
          {
            entity,
            databaseEntity: { password: hash },
          } as UpdateEvent<User>,
        );

        // Password did not change
        expect(entity.password).toEqual(hash);
      });

      it('should hash the password', async () => {
        entity.password = '!234567$';

        await subscriber.beforeUpdate(
          {
            entity,
            databaseEntity: { password: hash },
          } as UpdateEvent<User>,
        );

        // Password did not change
        expect(entity.password).toEqual(hash);
      });
    });

    describe('.afterInsert()', () => {
      it('should call the send method of VerificationService with newly inserted user', async () => {
        await subscriber.afterInsert({ entity } as InsertEvent<User>);

        expect(verificationService.send).toBeCalledWith(entity);
      });
    });
  });
});
