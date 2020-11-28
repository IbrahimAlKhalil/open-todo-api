import { VerificationService } from './verification.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Config } from '../config/config.service';
import { JwtService } from '@nestjs/jwt';
import { mocked } from 'ts-jest/utils';

describe('VerificationService', () => {
  const config = {
    tokenLifetime: '1h',
  };
  let service: VerificationService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerificationService,
        {
          provide: Config,
          useValue: {
            verification: config,
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(VerificationService);
    jwtService = module.get(JwtService);
  });

  describe('.generateToken()', () => {
    const email = 'mail@host';
    const userId = 1;

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
});
