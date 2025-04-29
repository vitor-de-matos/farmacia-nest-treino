import { MAGIC_NUMBERS } from 'src/shared/types/buffer.type';
import { ConfigService } from '@nestjs/config';
import {
  InternalServerErrorException,
  NotAcceptableException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class ArchivesManagementJob {
  static readonly MAX_BYTES: number = 200 * 1024 * 1024;
  readonly PATH_TO_IMAGES: string;
  readonly PATH_TO_VIDS: string;
  readonly URL_TO_IMAGES: string;
  readonly URL_TO_VIDS: string;

  constructor(configService: ConfigService) {
    const PATH_TO_PUBLIC_STORAGE = process.env.PATH_TO_PUBLIC_STORAGE;
    const API_HOST = process.env.HOST;
    const API_PORT = process.env.PORT;
    const PRODUCTION = process.env.PRODUCTION;

    this.PATH_TO_IMAGES = `${PATH_TO_PUBLIC_STORAGE}/images`;
    this.PATH_TO_VIDS = `${PATH_TO_PUBLIC_STORAGE}/vids`;
    if (PRODUCTION == 'false') {
      this.URL_TO_IMAGES = `${API_HOST}:${API_PORT}/uploads/images`;
      this.URL_TO_VIDS = `${API_HOST}:${API_PORT}/uploads/vids`;
    } else {
      this.URL_TO_IMAGES = `${API_HOST}/uploads/images`;
      this.URL_TO_VIDS = `${API_HOST}/uploads/vids`;
    }
  }

  validateArchivesFile(file: Express.Multer.File): void {
    if (file.size > ArchivesManagementJob.MAX_BYTES) {
      throw new NotAcceptableException({
        message: `O arquivo deve ter menos de ${(ArchivesManagementJob.MAX_BYTES * 10 ** -6).toFixed(2)} megabytes`,
      });
    }
    this.validateFileNameIsSuported(file.mimetype);
    if (file.buffer) {
      this.validateMagicNumber(file);
    }
  }

  validateMagicNumber(file: Express.Multer.File): void {
    const buffer = file.buffer.subarray(0, 12);

    const isPng = buffer.subarray(0, 8).equals(MAGIC_NUMBERS.png);
    const isJpeg = buffer.subarray(0, 3).equals(MAGIC_NUMBERS.jpeg);
    const isMp4 = buffer.subarray(0, 8).equals(MAGIC_NUMBERS.mp4);
    const isWebp = buffer.subarray(0, 4).equals(MAGIC_NUMBERS.webp);
    const isGif = buffer.subarray(0, 4).equals(MAGIC_NUMBERS.gif);
    const isSvg = buffer.toString('utf8').includes('<svg');

    const isAvi = buffer.subarray(0, 4).equals(MAGIC_NUMBERS.avi);
    const isMov = buffer.subarray(0, 8).equals(MAGIC_NUMBERS.mov);
    const isWebm = buffer.subarray(0, 4).equals(MAGIC_NUMBERS.webm);
    const isMkv = buffer.subarray(0, 4).equals(MAGIC_NUMBERS.mkv);
    const isFlv = buffer.subarray(0, 3).equals(MAGIC_NUMBERS.flv);
    const isWmv = buffer.subarray(0, 8).equals(MAGIC_NUMBERS.wmv);

    const isValid =
      isPng ||
      isJpeg ||
      isMp4 ||
      isWebp ||
      isSvg ||
      isGif ||
      isAvi ||
      isMov ||
      isWebm ||
      isMkv ||
      isFlv ||
      isWmv;

    if (!isValid) {
      throw new BadRequestException(
        'O arquivo enviado não é do tipo esperado.',
      );
    }
  }

  validateFileNameIsSuported(fileName: string): void {
    const EXTENSION_REGEX = /^(image|video|application)\/[a-zA-Z0-9.+-]+$/i;
    if (!EXTENSION_REGEX.test(fileName)) {
      throw new NotAcceptableException({
        message: 'Formato não suportado',
      });
    }
  }

  async saveArchivesInFileSystem(
    midiaId: number,
    file: Express.Multer.File,
  ): Promise<string> {
    const VIDEO = /\.(mp4|avi|mov|webm|mkv|flv|wmv)$/i;

    if (VIDEO.test(file.originalname)) {
      if (!fs.existsSync(this.PATH_TO_VIDS)) {
        fs.mkdirSync(this.PATH_TO_VIDS, { recursive: true });
      }
      const fileExtension = file.mimetype.split('/')[1];
      const fileName = `${midiaId}_${Date.now()}.${fileExtension}`;
      const filePath = `${this.PATH_TO_VIDS}/${fileName}`;

      fs.writeFileSync(filePath, file.buffer);
      return fileName;
    } else {
      if (!fs.existsSync(this.PATH_TO_IMAGES)) {
        fs.mkdirSync(this.PATH_TO_IMAGES, { recursive: true });
      }
    }
    const fileExtension =
      file.mimetype === 'image/svg+xml' ? 'svg' : file.mimetype.split('/')[1];

    const fileName = `${midiaId}_${Date.now()}.${fileExtension}`;
    const filePath = `${this.PATH_TO_IMAGES}/${fileName}`;

    fs.writeFileSync(filePath, file.buffer);

    return fileName;
  }

  async removeArchivesFromFileSystem(mediaName: string): Promise<void> {
    const VIDEO = /\.(mp4|avi|mov|webm|mkv|flv|wmv)$/i;

    if (VIDEO.test(mediaName)) {
      const filePath = `${this.PATH_TO_VIDS}/${mediaName}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        throw new InternalServerErrorException({
          message: 'Erro ao deletar arquivo',
        });
      }
    } else {
      const filePath = `${this.PATH_TO_IMAGES}/${mediaName}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      if (!filePath) {
        throw new InternalServerErrorException({
          message: 'Erro ao deletar arquivo',
        });
      } else {
        return;
      }
    }
  }

  async completeArchivePath(fileName: string): Promise<string> {
    const encodedFileName = encodeURIComponent(fileName);
    const VIDEO = /\.(mp4|avi|mov|webm|mkv|flv|wmv)$/i;

    if (VIDEO.test(fileName)) {
      return `${this.URL_TO_VIDS}/${encodedFileName}`;
    } else {
      return `${this.URL_TO_IMAGES}/${encodedFileName}`;
    }
  }
}
