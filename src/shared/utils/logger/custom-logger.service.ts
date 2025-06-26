import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private readonly logFile: string;

  constructor() {
    const logDir = path.join(__dirname, '../../../../log/');
    this.logFile = path.join(logDir, 'application.log');

    fs.mkdirSync(logDir, { recursive: true });
    fs.writeFileSync(this.logFile, '', 'utf8');
  }

  log(message: any) {
    this.printAndWrite('Log', message);
  }

  error(message: any, trace?: string) {
    this.printAndWrite('ERROR', `${message} \n${trace}`);
  }

  warn(message: any) {
    this.printAndWrite('WARN', message);
  }

  private printAndWrite(level: string, message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${level}] ${timestamp} - ${message}`;

    if (level === 'Error') {
      console.error(chalk.red(logMessage));
    } else if (level === 'Warn') {
      console.warn(chalk.yellow(logMessage));
    } else {
      console.log(chalk.green(logMessage));
    }

    fs.appendFileSync(this.logFile, logMessage + '\n');
  }
}
