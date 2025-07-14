import {
  ForbiddenException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (Array.isArray(user?.permissions) && user.permissions.includes(1)) {
      return true;
    }

    throw new ForbiddenException('Acesso restrito a administradores');
  }
}
