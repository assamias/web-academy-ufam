import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

// Configurações para usar __dirname no ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3333;

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o arquivo JS opcional usando fs/promises
app.get('/main.js', async (req, res) => {
  try {
    const jsPath = path.join(__dirname, 'public', 'main.js');
    const code = await readFile(jsPath, 'utf8');
    res.type('application/javascript').send(code);
  } catch (err) {
    res.status(404).type('text/plain').send('// main.js não encontrado');
  }
});

// Dados de parágrafos Lorem Ipsum para gerar
const lipsum = [
  'Neque augue amet id ut at et tristique nec? Est lorem nam congue sollicitudin class tristique himenaeos viverra nascetur ante, nullam sem nisl sagittis arcu sit condimentum. Feugiat class nunc sagittis adipiscing habitant semper ullamcorper rhoncus facilisis eleifend?',
  'Nossa torquent nibh nascetur non varius montes neque dictum conubia fermentum. Sem netus lectus maecenas interdum amet purus dignissim feugiat ullamcorper scelerisque dui adipiscing maecenas, phasellus sed tempus habitant fermentum luctus ridiculus, proin pharetra tempus morbi arcu mus est urna pharetra sem blandit, praesent tempus sociis, pharetra magnis fusce commodo taciti feugiat lectus rhoncus accumsan? Dictumst semper lectus varius dictum magnis phasellus natoque blandit diam ac.',
  'Cursus vestibulum urna quis metus leo interdum ante? Tempor proin conubia sodales penatibus justo praesent, dictumst conubia libero porttitor ornare donec? Fermentum dapibus nibh montes etiam.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
];

// Rota principal, que entrega a página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota que gera os parágrafos solicitados via query param qtd (ex: /gerar?qtd=3)
app.get('/gerar', (req, res) => {
  let qtd = parseInt(req.query.qtd, 10);
  if (isNaN(qtd) || qtd < 1) qtd = 3;
  if (qtd > 10) qtd = 10;

  const paragraphs = [];
  for (let i = 0; i < qtd; i++) {
    paragraphs.push(lipsum[i % lipsum.length]);
  }

  res.json({ paragraphs });
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
