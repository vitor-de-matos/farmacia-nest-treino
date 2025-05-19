import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(login, password);
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos!');
    }
    return user;
  }
}
