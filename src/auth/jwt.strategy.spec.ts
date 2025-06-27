import { JwtStrategy } from './jwt.strategy';
import { SECRET_KEY } from 'src/shared/utils/auth/auth.config';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(() => {
    jwtStrategy = new JwtStrategy();
  });

  it('deve retornar dados do payload no validate()', async () => {
    const payload = {
      id: 1,
      name: 'John Doe',
      permissions: ['read', 'write'],
    };

    const result = await jwtStrategy.validate(payload);

    expect(result).toEqual({
      id: 1,
      name: 'John Doe',
      permissions: ['read', 'write'],
    });
  });
});
