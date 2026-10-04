import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

export function logger(format: 'simples' | 'completo', baseDir: string) {
  const fullPath = path.isAbsolute(baseDir) ? baseDir : path.join(process.cwd(), baseDir);

  console.log('Middleware logger inicializado. Diretório base:', fullPath);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  return (req: Request, _res: Response, next: NextFunction): void => {
    const now = new Date().toISOString();
    const file = path.join(fullPath, `${now.slice(0, 10)}.log`);
    const line =
      format === 'simples'
        ? `${now} | ${req.method} | ${req.url}`
        : `${now} | ${req.method} | ${req.url} | ${req.httpVersion} | ${req.get('User-Agent') ?? 'Desconhecido'}`;

    // Escreve no arquivo
    fs.appendFile(file, line + '\n', (err) => {
      if (err) {
        console.error('Erro ao escrever log:', err.message);
      }
    });

    // Mostra também no terminal
    console.log('', line);

    next();
  };
}
