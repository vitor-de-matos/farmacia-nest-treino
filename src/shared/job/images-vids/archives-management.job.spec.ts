import { ArchivesManagementJob } from './archives-management.job';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import {
  BadRequestException,
  NotAcceptableException,
  InternalServerErrorException,
} from '@nestjs/common';

jest.mock('fs');

describe('ArchivesManagementJob', () => {
  let service: ArchivesManagementJob;

  const mockFile: Express.Multer.File = {
    originalname: 'file.jpg',
    buffer: Buffer.from([0xff, 0xd8, 0xff]),
    size: 1024,
    mimetype: 'image/jpeg',
    fieldname: '',
    encoding: '',
    destination: '',
    filename: '',
    path: '',
    stream: null,
  };

  beforeEach(() => {
    process.env.PATH_TO_PUBLIC_STORAGE = 'public';
    process.env.HOST = 'http://localhost';
    process.env.PORT = '3000';
    process.env.PRODUCTION = 'false';

    const configService = new ConfigService();
    service = new ArchivesManagementJob(configService);

    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('deve configurar URLs com porta no modo desenvolvimento', () => {
      process.env.PRODUCTION = 'false';
      process.env.HOST = 'http://localhost';
      process.env.PORT = '3000';
      process.env.PATH_TO_PUBLIC_STORAGE = 'public';

      const service = new ArchivesManagementJob(new ConfigService());

      expect(service.URL_TO_IMAGES).toBe(
        'http://localhost:3000/uploads/images',
      );
      expect(service.URL_TO_VIDS).toBe('http://localhost:3000/uploads/vids');
    });

    it('deve configurar URLs sem porta no modo produção', () => {
      process.env.PRODUCTION = 'true';
      process.env.HOST = 'https://cdn.site.com';
      process.env.PORT = '3000';
      process.env.PATH_TO_PUBLIC_STORAGE = 'public';

      const service = new ArchivesManagementJob(new ConfigService());

      expect(service.URL_TO_IMAGES).toBe('https://cdn.site.com/uploads/images');
      expect(service.URL_TO_VIDS).toBe('https://cdn.site.com/uploads/vids');
    });
  });

  describe('validateFileNameIsSuported', () => {
    it('deve aceitar mimetype válido', () => {
      expect(() =>
        service.validateFileNameIsSuported('image/jpeg'),
      ).not.toThrow();
    });

    it('deve rejeitar mimetype inválido', () => {
      expect(() => service.validateFileNameIsSuported('text/plain')).toThrow(
        NotAcceptableException,
      );
    });
  });

  describe('validateArchivesFile', () => {
    it('deve aceitar arquivos válidos', () => {
      expect(() => service.validateArchivesFile(mockFile)).not.toThrow();
    });

    it('deve lançar erro se o arquivo exceder o limite', () => {
      const largeFile = {
        ...mockFile,
        size: ArchivesManagementJob.MAX_BYTES + 1,
      };
      expect(() => service.validateArchivesFile(largeFile)).toThrow(
        NotAcceptableException,
      );
    });

    it('deve lançar erro se magic number for inválido', () => {
      const invalidFile = {
        ...mockFile,
        buffer: Buffer.from([0x00, 0x01, 0x02]),
      };
      expect(() => service.validateArchivesFile(invalidFile)).toThrow(
        BadRequestException,
      );
    });
  });

  describe('saveArchivesInFileSystem', () => {
    it('deve salvar imagem criando diretório se necessário', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      const result = await service.saveArchivesInFileSystem(1, mockFile);

      expect(fs.mkdirSync).toHaveBeenCalledWith(
        expect.stringContaining('/images'),
        { recursive: true },
      );
      expect(fs.writeFileSync).toHaveBeenCalled();
      expect(result).toMatch(/1_\d+\.jpeg/);
    });

    it('deve salvar vídeo criando diretório se necessário', async () => {
      const videoFile: Express.Multer.File = {
        ...mockFile,
        originalname: 'video.mp4',
        mimetype: 'video/mp4',
      };

      (fs.existsSync as jest.Mock).mockReturnValue(false);
      (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      const result = await service.saveArchivesInFileSystem(1, videoFile);

      expect(fs.mkdirSync).toHaveBeenCalledWith(
        expect.stringContaining('/vids'),
        { recursive: true },
      );
      expect(fs.writeFileSync).toHaveBeenCalled();
      expect(result).toMatch(/1_\d+\.mp4/);
    });

    it('deve salvar imagem SVG corretamente', async () => {
      const svgFile: Express.Multer.File = {
        ...mockFile,
        originalname: 'icon.svg',
        mimetype: 'image/svg+xml',
      };

      (fs.existsSync as jest.Mock).mockReturnValue(false);
      (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      const result = await service.saveArchivesInFileSystem(99, svgFile);

      expect(fs.mkdirSync).toHaveBeenCalledWith(
        expect.stringContaining('/images'),
        { recursive: true },
      );
      expect(fs.writeFileSync).toHaveBeenCalled();
      expect(result).toMatch(/99_\d+\.svg/);
    });
  });

  describe('removeArchivesFromFileSystem', () => {
    it('deve remover vídeo existente', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

      await expect(
        service.removeArchivesFromFileSystem('video.mp4'),
      ).resolves.not.toThrow();
      expect(fs.unlinkSync).toHaveBeenCalled();
    });

    it('deve remover imagem existente', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

      await expect(
        service.removeArchivesFromFileSystem('img.jpg'),
      ).resolves.not.toThrow();
      expect(fs.unlinkSync).toHaveBeenCalled();
    });

    it('deve lançar erro ao tentar remover vídeo inexistente', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      await expect(
        service.removeArchivesFromFileSystem('video.mp4'),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('deve lançar erro ao tentar remover imagem inexistente', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      await expect(
        service.removeArchivesFromFileSystem('image.png'),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('completeArchivePath', () => {
    it('deve retornar URL para vídeo', async () => {
      const result = await service.completeArchivePath('video.mp4');
      expect(result).toBe('http://localhost:3000/uploads/vids/video.mp4');
    });

    it('deve retornar URL para imagem', async () => {
      const result = await service.completeArchivePath('image.jpg');
      expect(result).toBe('http://localhost:3000/uploads/images/image.jpg');
    });
  });
});
