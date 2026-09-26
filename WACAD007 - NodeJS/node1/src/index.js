const http = require("http")
const fs = require("fs")
const dotenv = require("dotenv")

const toUpper = require("./utils/strings")
const { createLink } = require("./utils/links")

dotenv.config({ quiet: true, path: `${process.cwd()}/.env.${process.env.NODE_ENV}` })

const FOLDER = process.argv[2]
const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
    if (req.url === "/") {
        fs.readdir(`${process.cwd()}/${FOLDER}`, (err, files) => {
            if (err) {
                res.write("Erro ao ler a pasta")
                return res.end()
            }
            files.forEach(f => res.write(createLink(f)))
            res.end()
        })
    } else {
        if (req.url === "/favicon.ico") {
            return res.end()
        }
        fs.readFile(
            `${process.cwd()}/${FOLDER}${req.url}`, "utf-8", (err, content) => {
                if (err) {
                    res.write("Arquivo não encontrado")
                    return res.end()
                }
                res.write(`<a href="/">Voltar</a><br><br>`)
                res.write("Adicione um link voltar nas páginas deconteúdo, para que o usuário possa voltar para a página de links<br><br>")
                res.write(content)
                res.end()
            }
        )
    }
})

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})