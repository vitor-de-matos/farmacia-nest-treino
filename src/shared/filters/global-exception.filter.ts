import { Request, Response } from 'express';
import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Catch,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const isDevelopment = process.env.PRODUCTION !== 'true';

    const message = this.formatErrorMessage(request, exception);
    await this.writeErrorLog(message);

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: this.getClientErrorMessage(exception),
      ...(isDevelopment && { error: this.getErrorStack(exception) }),
    };

    response.status(status).json(errorResponse);
  }

  private getClientErrorMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const message =
        typeof response === 'object' && response !== null
          ? (response as any).message || response
          : response;
      return message;
    } else {
      return 'Erro interno entre em contato com o suporte.';
    }
  }

  private getErrorStack(exception: unknown): string | undefined {
    if (exception instanceof Error) {
      return exception.stack;
    }
    return undefined;
  }

  private formatErrorMessage(request: Request, exception: unknown): string {
    const { method, url, ip, body, params, query } = request;
    const userId = (request as any).user?.id ?? null;
    const timestamp = new Date().toLocaleString();

    const errorDetails =
      exception instanceof Error
        ? `${exception.message}\n${exception.stack}`
        : JSON.stringify(exception);

    return `${timestamp} - Error:
            Método: ${method}
            URL: ${url}
            UserID: ${userId}
            IP: ${ip}
            Error: ${errorDetails}
            Body: ${JSON.stringify(body)}
            Params: ${JSON.stringify(params)}
            Query: ${JSON.stringify(query)}
\r\n`;
  }

  private async writeErrorLog(message: string) {
    const logDirectory = path.join(__dirname, '../../../log/');
    const logFile = 'reqErrors.log';
    const logPath = path.join(logDirectory, logFile);

    try {
      await fs.promises.access(logDirectory, fs.constants.F_OK);
    } catch (error) {
      await fs.promises.mkdir(logDirectory, { recursive: true });
    }

    await fs.promises.appendFile(logPath, message);
  }
}
