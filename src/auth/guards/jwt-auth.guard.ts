import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { IS_PUBLIC_KEY } from '../public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token ausente ou inválido.');
    }

    return (await super.canActivate(context)) as boolean;
  }
}

export function extractToken(authorizationHeader: string): string {
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('Token inválido ou ausente.');
  }

  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    throw new UnauthorizedException('Token inválido.');
  }

  return token;
}
