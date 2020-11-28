import { Config } from '../config/config.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerificationService {
  private jwtAudience = 'Verification Module';
  private jwtSubject = 'email-verification';

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: Config,
  ) {
  }

  private generateToken(email: string, userId: number): Promise<string> {
    return this.jwtService.signAsync(
      { email, userId },
      {
        expiresIn: this.config.verification.tokenLifetime,
        audience: this.jwtAudience,
        subject: this.jwtSubject,
      },
    );
  }
}
