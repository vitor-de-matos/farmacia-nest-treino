import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let mockRepo: any;
  let mockJwtService: any;

  beforeEach(() => {
    mockRepo = {
      findByDocument: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    mockJwtService = {
      sign: jest.fn(),
      verify: jest.fn(),
    };

    authService = new AuthService(mockRepo, mockJwtService);
  });

  describe('validateUser', () => {
    it('deve retornar o usuário sem a senha se a senha estiver correta', async () => {
      const passwordHash = await bcrypt.hash('123456', 10);
      const mockUser = { id: 1, login: 'test', password: passwordHash };
      mockRepo.findByDocument.mockResolvedValue(mockUser);

      const result = await authService.validateUser('test', '123456');
      expect(result).toHaveProperty('id', 1);
      expect(result).not.toHaveProperty('password');
    });

    it('deve lançar UnauthorizedException se o usuário não for encontrado', async () => {
      mockRepo.findByDocument.mockResolvedValue(null);

      await expect(
        authService.validateUser('notfound', '123456'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException se a senha estiver incorreta', async () => {
      const passwordHash = await bcrypt.hash('senha-correta', 10);
      const mockUser = { id: 1, login: 'test', password: passwordHash };
      mockRepo.findByDocument.mockResolvedValue(mockUser);

      await expect(
        authService.validateUser('test', 'senha-incorreta'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('deve retornar tokens corretamente', async () => {
      const mockUser: any = {
        id: 1,
        person: { name: 'John Doe' },
        permissionLevel: [1, 2],
      };

      mockJwtService.sign
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = await authService.login(mockUser, true);

      expect(result).toEqual({
        access_token: 'access-token',
        refresh_token: 'refresh-token',
      });

      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
    });
  });

  it('deve gerar refresh_token com 30d se remember for false', async () => {
    const mockUser: any = {
      id: 1,
      person: { name: 'John Doe' },
      permissionLevel: [1],
    };

    mockJwtService.sign
      .mockReturnValueOnce('access-token')
      .mockReturnValueOnce('refresh-token');

    await authService.login(mockUser, false);

    expect(mockJwtService.sign).toHaveBeenCalledWith(
      { id: mockUser.id },
      expect.objectContaining({
        expiresIn: '30d',
      }),
    );
  });

  describe('refreshAccessToken', () => {
    it('deve gerar novo access token se refresh token for válido', async () => {
      const hashedRefreshToken = await bcrypt.hash('valid-token', 10);

      const mockUser = {
        id: 1,
        person: { name: 'John Doe' },
        permissionLevel: [1],
        refreshToken: hashedRefreshToken,
        refreshTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60),
      };

      mockJwtService.verify.mockReturnValue({ id: 1 });
      mockRepo.findById.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('new-access-token');

      const result = await authService.refreshAccessToken('valid-token');

      expect(result).toEqual({ access_token: 'new-access-token' });
      expect(mockJwtService.verify).toHaveBeenCalledWith('valid-token', {
        secret: process.env.REFRESH_TOKEN_SECRET_KEY,
      });
    });

    it('deve lançar UnauthorizedException se o token for inválido', async () => {
      mockJwtService.verify.mockReturnValue(undefined);

      await expect(
        authService.refreshAccessToken('invalid-token'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException se o token for undefined após verify', async () => {
      mockJwtService.verify.mockReturnValue(undefined);

      await expect(
        authService.refreshAccessToken('invalid-token'),
      ).rejects.toThrow(UnauthorizedException);
    });
    it('deve lançar UnauthorizedException se o usuário não for encontrado', async () => {
      ('');
      mockJwtService.verify.mockReturnValue({ id: 1 });
      mockRepo.findById.mockResolvedValue(null);

      await expect(
        authService.refreshAccessToken('valid-token'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException se o refresh token estiver expirado', async () => {
      const hashedToken = await bcrypt.hash('valid-token', 10);

      const expiredDate = new Date(Date.now() - 1000);
      const mockUser = {
        id: 1,
        person: { name: 'John Doe' },
        permissionLevel: [1],
        refreshToken: hashedToken,
        refreshTokenExpiresAt: expiredDate,
      };

      mockJwtService.verify.mockReturnValue({ id: 1 });
      mockRepo.findById.mockResolvedValue(mockUser);

      await expect(
        authService.refreshAccessToken('valid-token'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve atualizar o usuário com refreshToken hasheado e data de expiração', async () => {
      const mockUser: any = {
        id: 1,
        person: { name: 'Jane Doe' },
        permissionLevel: [1],
      };

      mockJwtService.sign
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('raw-refresh-token');

      const spyHash = jest.spyOn(bcrypt, 'hash');
      const result = await authService.login(mockUser, true);

      expect(spyHash).toHaveBeenCalledWith('raw-refresh-token', 12);
      expect(mockRepo.update).toHaveBeenCalledWith(
        mockUser.id,
        expect.objectContaining({
          refreshToken: expect.any(String),
          refreshTokenExpiresAt: expect.any(Date),
        }),
      );
    });
  });

  describe('logout', () => {
    it('deve limpar refreshToken e refreshTokenExpiresAt', async () => {
      const userId = 42;

      await authService.logout(userId);

      expect(mockRepo.update).toHaveBeenCalledWith(userId, {
        refreshToken: null,
        refreshTokenExpiresAt: null,
      });
    });
  });
});
