import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
    refreshAccessToken: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('deve retornar tokens ao fazer login válido', async () => {
      const dto = { login: 'user', password: '1234', remember: true };
      const mockUser = { id: 1, login: 'user' };
      const mockToken = { access_token: 'abc', refresh_token: 'def' };

      mockAuthService.validateUser.mockResolvedValue(mockUser);
      mockAuthService.login.mockResolvedValue(mockToken);

      const result = await authController.login(dto);
      expect(result).toEqual(mockToken);
      expect(mockAuthService.validateUser).toHaveBeenCalledWith('user', '1234');
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser, true);
    });

    it('deve lançar BadRequestException se login for inválido', async () => {
      const dto = { login: 'user', password: 'wrong', remember: false };
      mockAuthService.validateUser.mockResolvedValue(null);

      await expect(authController.login(dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('refresh', () => {
    it('deve retornar novo access token', async () => {
      const dto = { refresh_token: 'valid-token' };
      const mockResult = { access_token: 'novo-token' };

      mockAuthService.refreshAccessToken.mockResolvedValue(mockResult);

      const result = await authController.refresh(dto);
      expect(result).toEqual(mockResult);
      expect(mockAuthService.refreshAccessToken).toHaveBeenCalledWith(
        'valid-token',
      );
    });
  });
});
