import { AuthController, AuthLogout } from './auth.controller';
import { EmployeeLoginModule } from 'src/employee-login/employee-login.module';
import { forwardRef, Module } from '@nestjs/common';
import { FuncionarioLogin } from 'src/employee-login/models/entity/employee-login.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { SECRET_KEY } from 'src/shared/utils/auth/auth.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([FuncionarioLogin]),
    PassportModule,
    forwardRef(() => EmployeeLoginModule),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController, AuthLogout],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
