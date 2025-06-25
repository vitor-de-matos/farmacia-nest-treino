import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CustomLoggerService implements LoggerService {
  log(message: any) {
    this.writeToFile('Log', message);
  }

  error(message: any, trace?: string) {
    this.writeToFile('ERROR', `${message} \n${trace}`);
  }

  warn(message: any) {
    this.writeToFile('WARN', message);
  }

  private writeToFile(level: string, message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${level}] ${timestamp} - ${message}\n`;
    const logDir = path.join(__dirname, '../../../../log/');
    const logFile = path.join(logDir, 'application.log');

    fs.mkdirSync(logDir, { recursive: true });
    fs.appendFileSync(logFile, logMessage);
  }
}
