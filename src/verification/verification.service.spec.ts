import { VerificationService } from './verification.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../mail/mail.service';
import { Config } from '../config/config.service';
import { JwtService } from '@nestjs/jwt';
import { mocked } from 'ts-jest/utils';

describe('VerificationService', () => {
  const config = {
    tokenLifetime: '1h',
  };
  const email = 'mail@host';
  const userId = 1;

  let service: VerificationService;
  let mailService: MailService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerificationService,
        {
          provide: Config,
          useValue: {
            verification: config,
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
          },
        },
        {
          provide: MailService,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(VerificationService);
    mailService = module.get(MailService);
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

    it('should use Expiration Time, Audience and Subject to sign the token', async () => {
      expect(
        mocked(jwtService.signAsync).mock.calls[0][1],
      ).toStrictEqual({
        expiresIn: config.tokenLifetime,
        audience: (service as any).jwtAudience,
        subject: (service as any).jwtSubject,
      });
    });
  });

  describe('.send()', () => {
    it('should send a mail to given address', async () => {
      await service.send(email, { id: userId } as any);

      expect(
        mocked(mailService.send).mock.calls[0][0].to,
      ).toBe(email);
    });
  });
});
