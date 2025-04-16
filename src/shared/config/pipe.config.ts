import { ValidationPipe } from '@nestjs/common';

export const CONFIG_PIPES = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
});
