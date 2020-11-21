import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';
import * as bcrypt from 'bcryptjs';
import { mocked } from 'ts-jest';

describe('BcryptService', () => {
  let service: BcryptService;
  const mockedHash = 'kyr2834';
  const text = 'secret';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get(BcryptService);
  });

  describe('.hash()', () => {
    it('should call the bcrypt.hash method and return whatever it returns', async () => {
      jest.spyOn(bcrypt, 'hash')
        .mockResolvedValueOnce(mockedHash as never); // Couldn't find any way other than asserting it as never

      const hash = await service.hash(text);

      // Should call the bcrypt.hash method
      expect(bcrypt.hash).toBeCalled();

      // Should pass text as first argument
      expect(mocked(bcrypt.hash).mock.calls[0][0]).toEqual(text);

      // Should return whatever the hash method returns
      expect(hash).toEqual(mockedHash);
    });
  });

  describe('.compare()', () => {
    it('should call the bcrypt.compare method and return whatever it returns', async () => {
      jest.spyOn(bcrypt, 'compare')
        .mockResolvedValueOnce(true as never);

      const returnValue = await service.compare(text, mockedHash);

      expect(bcrypt.compare).toBeCalledWith(text, mockedHash);
      expect(returnValue).toBe(true);
    });
  });
});
