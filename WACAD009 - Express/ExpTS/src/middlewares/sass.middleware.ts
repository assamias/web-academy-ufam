import path from 'path';
import sass from 'sass';
import fs from 'fs';
import type { Request, Response, NextFunction } from 'express';

const srcPath = path.join(process.cwd(), 'src', 'sass', 'main.scss');
const destPath = path.join(process.cwd(), 'src', 'css', 'main.css');

export function compileSassMiddleware(_req: Request, _res: Response, next: NextFunction): void {
  try {
    if (!fs.existsSync(srcPath)) {
      console.warn(`Arquivo SASS não encontrado: ${srcPath}`);
      return next();
    }

    // Compila o SASS
    const result = sass.compile(srcPath, { style: 'expanded' });

    // Garante que a pasta css exista
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, result.css);

    console.log('SASS compilado com sucesso!');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao compilar SASS:', error.message);
    } else {
      console.error('Erro desconhecido ao compilar SASS:', error);
    }
  }

  next();
}
