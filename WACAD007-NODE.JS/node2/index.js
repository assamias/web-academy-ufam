const path = require("path");
const fs = require("fs");
const http = require("http");

const env = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `.env.${env}` });

const PORT = process.env.PORT || 3000;
const DIRECTORY = path.join(__dirname, "pulblic"); // public correto

function createLink(filename) {
  return `<a href="/file/${filename}">${filename}</a><br>\n`;
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readdir(DIRECTORY, (err, files) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Erro ao listar diretório");
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      files.forEach((file) => res.write(createLink(file)));
      return res.end();
    });
  } else if (req.url.startsWith("/file/")) {
    const fileName = req.url.slice("/file/".length);
    const filePath = path.join(DIRECTORY, fileName);
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Arquivo não encontrado");
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(`<a href="/">Voltar</a><br><br><pre>${data}</pre>`);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Página não encontrada");
  }
});

console.log("Pasta pública ->", DIRECTORY);
server.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
