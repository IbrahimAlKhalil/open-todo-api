import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  hash(text: string): Promise<string> {
    return bcrypt.hash(text, 15);
  }

  compare(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
}
