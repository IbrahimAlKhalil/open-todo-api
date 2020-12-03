import { VerificationService } from './verification.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { Config } from '../config/config.service';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { mocked } from 'ts-jest/utils';

describe('VerificationService', () => {
  const email = 'mail@host';
  const userId = 1;

  let service: VerificationService;
  let mailService: MailService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerificationService,
        {
          provide: Config,
          useValue: {
            verification: {},
            app: {
              clientURL: 'http://opentodo',
              logo: 'http://opentodo/logo.png',
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(() => Promise.resolve({ email, userId })),
          },
        },
        {
          provide: MailService,
          useValue: {
            send: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(VerificationService);
    mailService = module.get(MailService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  describe('.generateToken()', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      await (service as any).generateToken(email, userId);
    });

    it('should put the email and userId in the payload of the jwt', async () => {
      expect(
        mocked(jwtService.signAsync).mock.calls[0][0],
      ).toStrictEqual({ email, userId });
    });
  });

  describe('.send()', () => {
    it('should send a mail to given address', async () => {
      await service.send({ id: userId } as any, email);

      expect(
        mocked(mailService.send).mock.calls[0][0].to,
      ).toBe(email);
    });

    it('should send a mail to the user\'s email address', async () => {
      await service.send({ id: userId, email } as any);

      expect(
        mocked(mailService.send).mock.calls[0][0].to,
      ).toBe(email);
    });
  });

  describe('.verify()', () => {
    it('should return false (token verification failed)', async () => {
      jest.spyOn(jwtService, 'verifyAsync')
        .mockRejectedValueOnce('invalid');

      expect(
        await service.verify('token'),
      ).toBe(false);
    });

    it('should return false (no user)', async () => {
      expect(
        await service.verify('token'),
      ).toBe(false);
    });

    it('should return false (email not changed)', async () => {
      jest.spyOn(userService, 'findOne')
        .mockResolvedValueOnce({ email, verified: true } as User);

      expect(
        await service.verify('token'),
      ).toBe(false);
    });

    it('should return true (not verified)', async () => {
      jest.spyOn(userService, 'findOne')
        .mockResolvedValueOnce({ email, verified: false } as User);

      expect(
        await service.verify('token'),
      ).toBe(true);
    });

    it('should set the value of the verified column to "true"', async () => {
      jest.spyOn(userService, 'findOne')
        .mockResolvedValueOnce({ email, verified: false } as User);

      await service.verify('token');
      expect(userService.update).toBeCalledWith(userId, { email, verified: true });
    });

    it('should update the email column', async () => {
      jest.spyOn(userService, 'findOne')
        .mockResolvedValueOnce({ email: 'mail@host2', verified: true } as User);

      await service.verify('token');
      expect(userService.update).toBeCalledWith(userId, { email });
    });
  });
});
