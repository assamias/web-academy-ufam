import 'dotenv/config';
import Handlebars from 'handlebars';
import express from 'express';
import exphbs from 'express-handlebars';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateEnv } from './utils/validateEnv.js';
import { logger } from './middlewares/logger.js';
import { compileSassMiddleware } from './middlewares/sass.middleware.js';
import routes from './routes/main.routes.js';
import produtoRoutes from './routes/produto.routes.js';

// ------------------- Corrige __dirname (modo ESM) -------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------- Valida variáveis de ambiente -------------------
const { PORT, LOG_DIR, LOG_FORMAT } = validateEnv();

// ------------------- Cria o app -------------------
const app = express();

// ------------------- Middleware para ler formulários (POST) -------------------
app.use(express.urlencoded({ extended: false }));

// ------------------- Middleware de compilação automática do SASS -------------------
app.use(compileSassMiddleware);

// ------------------- Servir arquivos estáticos -------------------
// Aqui mudamos o caminho: agora o Express serve o CSS gerado em src/css
app.use(express.static(path.join(__dirname, 'css')));

// ------------------- Configura o Handlebars -------------------
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  helpers: {
    year: () => new Date().getFullYear(),
    eq: (a: unknown, b: unknown) => a === b,
    listNodeTechnologies(technologies: { name: string; type: string; poweredByNodejs: boolean }[]) {
      let result = '';
      for (const tech of technologies) {
        if (tech.poweredByNodejs) {
          result += `<li>${tech.name} - ${tech.type}</li>`;
        }
      }
      return new Handlebars.SafeString(result);
    },
  },
});

// ------------------- Registra o Handlebars -------------------
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ------------------- Middleware de logs -------------------
app.use(logger(LOG_FORMAT, LOG_DIR));

// ------------------- Rotas principais -------------------
app.use('/', routes);

// ------------------- Rotas do CRUD de Produtos -------------------
app.use('/produto', produtoRoutes);

// ------------------- Inicializa o servidor -------------------
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
