import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IEmployeeLoginRepo } from 'src/employee-login/models/interface/employee-login.interface';
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
      access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
      refresh_token: this.generateRefreshToken(user, remember),
    };
  }

  private generateRefreshToken(user: FuncionarioLogin, remember: boolean) {
    const payload = { id: user.id };
    const daysToExpiry = remember ? '30d' : '7d';
    return this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
      expiresIn: daysToExpiry,
    });
  }

  async refreshAccessToken(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
    });

    if (!decoded) {
      throw new UnauthorizedException('Token de refresh inválido ou expirado');
    }

    const user = await this.employeeLoginRepository.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
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
}
