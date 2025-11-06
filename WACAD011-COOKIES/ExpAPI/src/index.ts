import express from "express";
import router from "./router";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const server = express();

server.use(express.json());
server.use(router);

server.listen(PORT, () =>
  console.log(`API funcionando na porta http://localhost:${PORT}/v1/products`)
);
