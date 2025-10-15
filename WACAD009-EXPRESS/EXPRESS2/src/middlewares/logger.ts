import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

type LogType = 'simples' | 'completa';

const logDir = process.env.LOG_DIR || 'logs';
const logFile = path.join(logDir, 'access.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

function logger(logType: LogType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const now = new Date().toISOString();
    let logLine = '';

    if (logType === 'simples') {
      logLine = `${now} ${req.url} ${req.method}`;
    } else {
      logLine = `${now} ${req.url} ${req.method} ${req.httpVersion} ${req.get('User-Agent')}`;
    }

    fs.appendFile(logFile, logLine + '\n', (err) => {
      if (err) console.error('Erro ao escrever log:', err);
    });

    next();
  };
}

export default logger;
