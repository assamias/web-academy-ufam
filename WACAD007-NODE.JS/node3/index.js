import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3333;

// Middleware para interpretar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos (CSS)
app.use(express.static(path.join(__dirname, "public")));

// Página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "page.html"));
});

// Recebe quantidade de parágrafos
app.post("/generate", (req, res) => {
  let { paragraphs } = req.body;
  paragraphs = parseInt(paragraphs) || 1;

  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  let html = "";
  for (let i = 0; i < paragraphs; i++) {
    html += `<p>${lorem}</p>`;
  }

  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <h1>Seu Lorem Ipsum</h1>
        ${html}
        <a href="/">Voltar</a>
      </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
