import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDTO } from './models/dto/login.dto';
import { RefreshDTO } from './models/dto/refresh.dto';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 400, description: 'E-mail ou senha inválidos' })
  @Public()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: LoginDTO })
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const { login: document, password, remember } = loginDTO;

    const user = await this.authService.validateUser(document, password);
    if (!user) {
      throw new BadRequestException('E-mail ou senha inválidos');
    }

    return this.authService.login(user, remember);
  }

  @ApiOperation({ summary: 'Refresh do token de acesso' })
  @ApiResponse({ status: 200, description: 'Novo access token gerado' })
  @ApiResponse({
    status: 401,
    description: 'Refresh token inválido ou expirado',
  })
  @Public()
  @Post('refresh')
  async refresh(@Body() refreshDTO: RefreshDTO) {
    const refresh_token = refreshDTO.refresh_token;
    return this.authService.refreshAccessToken(refresh_token);
  }
}

@ApiTags('Autenticação')
@ApiBearerAuth('access-token')
@Controller('auth')
@UseGuards(AuthGuard('jwt'))
export class AuthLogout {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Logout do usuario' })
  @Delete('logout')
  async logout(@Req() req) {
    await this.authService.logout(req.user.id);
    return { message: 'Logout realizado com sucesso' };
  }
}
