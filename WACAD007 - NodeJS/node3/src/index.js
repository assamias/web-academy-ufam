import http from "http";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config({path: ".env.development"});

const PORT = process.env.PORT || 3333;

const server = http.createServer(async (req, res) => {
    let arquivo = req.url === "/" ? "/index.html" : req.url;

    const caminhoArquivo = path.join(process.cwd(), "public", arquivo);

    try {
        const conteudo = await fs.readFile(caminhoArquivo);

        if (arquivo.endsWith(".html")) {
            res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
        } else if (arquivo.endsWith(".css")) {
            res.writeHead(200, { "content-type": "text/css;charset=utf-8" });
        } else if (arquivo.endsWith(".js")) {
            res.writeHead(200, { "content-type": "application/javascript;charset=utf-8" });
        }
        res.end(conteudo);

    } catch (erro) {
        res.writeHead(404, { "content-type": "text/plain;charset=utf-8" });
        res.end("Arquivo não encontrado");
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});