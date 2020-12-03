import verificationTemplate from './verification.template';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { Config } from '../config/config.service';
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerificationService {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: Config,
  ) {
  }

  private generateToken(email: string, userId: number): Promise<string> {
    return this.jwtService.signAsync({ email, userId });
  }

  private getVerificationUrl(token: string): string {
    const url = new URL(this.config.app.clientURL);

    url.pathname = 'verification';
    url.searchParams.append('token', token);

    return url.toString();
  }

  async send(user: User, email?: string): Promise<any> {
    const token = await this.generateToken(email, user.id);

    return await this.mailService.send({
      subject: this.config.verification.subject,
      to: email ?? user.email,
      from: this.config.verification.from,
      html: verificationTemplate(
        this.getVerificationUrl(token),
        this.config.app.logo,
      ),
    });
  }

  async verify(token: string): Promise<boolean> {
    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch (e) {
      return false;
    }

    // Since the email column is indexed, an attacker can abuse a non-expired jwt
    // and perform a DDoS attack on the user table, so it'll be wise to load the user
    // and check if the email has really changed before performing update

    const user = await this.userService.findOne(payload.userId);

    // It's possible that a user has deleted his/her account after  using this token,
    // and the token is still valid,
    // in that case we don't have the user in the database to update the email address

    if (!user || (user.email === payload.email && user.verified)) {
      return false;
    }

    const userData: Partial<User> = {
      email: payload.email,
    };

    // Set verified to true if it's not
    if (!user.verified) {
      userData.verified = true;
    }

    await this.userService.update(payload.userId, userData);

    return true;
  }
}

interface JwtPayload {
  userId: number;
  email: string;
}