import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IEmployeeLoginRepo } from 'src/employee-login/models/interface/employee-login-repo.interface';
import { FuncionarioLogin } from 'src/employee-login/models/entity/employee-login.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IEmployeeLoginRepo')
    private readonly employeeLoginRepository: IEmployeeLoginRepo,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.employeeLoginRepository.findByDocument(login);
    if (!user) {
      throw new UnauthorizedException('Login ou senha inválidos!');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Login ou senha inválidos!');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: FuncionarioLogin, remember: boolean) {
    const payload = {
      id: user.id,
      name: user.person.name,
      permissions: user.permissionLevel,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: await this.generateRefreshToken(user, remember),
    };
  }

  private async generateRefreshToken(
    user: FuncionarioLogin,
    remember: boolean,
  ): Promise<string> {
    const payload = { id: user.id };
    const expiresIn = remember ? '7d' : '30d';

    const token = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
      expiresIn,
    });

    const hashedToken = await bcrypt.hash(token, 12);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (remember ? 7 : 30));

    user.refreshToken = hashedToken;
    user.refreshTokenExpiresAt = expiresAt;

    await this.employeeLoginRepository.update(user.id, user);

    return token;
  }

  async refreshAccessToken(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
    });

    if (!decoded || !decoded.id) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    const user = await this.employeeLoginRepository.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedException('Token invalido ou expirado');
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid || new Date() > user.refreshTokenExpiresAt) {
      throw new UnauthorizedException('Token invalido ou expirado');
    }

    const payload = {
      id: user.id,
      name: user.person.name,
      permissions: user.permissionLevel,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(userId: number) {
    await this.employeeLoginRepository.update(userId, {
      refreshToken: null,
      refreshTokenExpiresAt: null,
    });
  }
}
