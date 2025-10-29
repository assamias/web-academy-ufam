import path from 'path';
import { fileURLToPath } from 'url';

type Env = {
  PORT: number;
  LOG_DIR: string;
  LOG_FORMAT: 'simples' | 'completo';
};

export function validateEnv(): Env {
  const errors: string[] = [];

  // Resolve caminho do diretório atual (modo ESM)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Porta
  const PORT = Number(process.env.PORT);
  if (!PORT || Number.isNaN(PORT)) errors.push('PORT ausente ou inválida');

  // Diretório de logs
  const LOG_DIR_ENV = process.env.LOG_DIR?.trim() || 'logs';
  const LOG_DIR = path.isAbsolute(LOG_DIR_ENV)
    ? LOG_DIR_ENV
    : path.join(__dirname, '..', LOG_DIR_ENV);

  // Formato do log
  const LOG_FORMAT_ENV = (process.env.LOG_FORMAT as Env['LOG_FORMAT']) ?? 'simples';
  const LOG_FORMAT: Env['LOG_FORMAT'] = ['simples', 'completo'].includes(LOG_FORMAT_ENV)
    ? LOG_FORMAT_ENV
    : 'simples';

  if (errors.length) {
    throw new Error('Erro(s) de configuração: ' + errors.join(' | '));
  }

  return { PORT, LOG_DIR, LOG_FORMAT };
}
