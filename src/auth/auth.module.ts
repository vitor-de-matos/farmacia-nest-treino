import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeLoginModule } from 'src/employee-login/employee-login.module';
import { FuncionarioLogin } from 'src/employee-login/models/entity/employee-login.entity';
import { SECRET_KEY } from 'src/shared/utils/auth/auth.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

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
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
