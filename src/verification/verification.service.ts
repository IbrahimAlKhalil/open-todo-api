import verificationTemplate from './verification.template';
import { MailService } from '../mail/mail.service';
import { Config } from '../config/config.service';
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerificationService {
  constructor(
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly config: Config,
  ) {
  }

  private jwtAudience = 'Verification Module';
  private jwtSubject = 'email-verification';

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

  private getVerificationUrl(token: string): string {
    const url = new URL(this.config.app.clientURL);

    url.pathname = 'verification';
    url.searchParams.append('token', token);

    return url.toString();
  }

  async send(email: string, user: User): Promise<any> {
    const token = await this.generateToken(email, user.id);

    return await this.mailService.send({
      subject: this.config.verification.subject,
      to: email,
      from: this.config.verification.from,
      html: verificationTemplate(
        this.getVerificationUrl(token),
        this.config.app.logo,
      ),
    });
  }
}
