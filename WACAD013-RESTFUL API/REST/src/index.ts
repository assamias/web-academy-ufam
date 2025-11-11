import express from "express";
import router from "./router";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import createLanguage from "./middlewares/createLanguage";
import { v4 as uuidv4 } from "uuid";
import validateEnv from "./utils/validateEnv";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";
import createCart from "./middlewares/createCart";

dotenv.config();
validateEnv();

const PORT = process.env.PORT ?? 3000;

const server = express();

server.use(express.json());
server.use(cookieParser());

// 1. O middleware de sessão DEVE vir antes de qualquer outro que use req.session
server.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
  })
);

// 2. Middlewares que dependem da sessão (createLanguage e createCart) vêm depois
server.use(createLanguage());
server.use(createCart());

server.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.use(router);

server.listen(PORT, () =>
  console.log(`API funcionando na porta http://localhost:${PORT}/v1/products`)
);
