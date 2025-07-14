import { ForbiddenException } from '@nestjs/common';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    guard = new AdminGuard();
  });

  function mockContext(user: any) {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
    } as any;
  }

  it('deve permitir acesso se o usuário tiver permission 1', () => {
    const context = mockContext({ permissions: [1, 2] });
    expect(guard.canActivate(context)).toBe(true);
  });

  it('deve bloquear acesso se o usuário não tiver permission 1', () => {
    const context = mockContext({ permissions: [2, 3] });

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('deve bloquear acesso se o usuário não existir', () => {
    const context = mockContext(undefined);

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('deve bloquear acesso se o usuário não tiver permissions', () => {
    const context = mockContext({});

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
