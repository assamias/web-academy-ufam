import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();

const doc = {
  info: {
    title: "API da Loja Virtual",
    description: "Documentação da API",
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  definitions: {
    CreateProductDTO: {
      name: "Mesa",
      price: 200,
      stock: 10,
    },
    Product: {
      id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      name: "Mesa",
      price: 200,
      stock: 10,
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/router/index.ts"];

swaggerAutogen()(outputFile, routes, doc);
