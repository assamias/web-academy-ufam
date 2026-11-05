import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import swaggerUi from "swagger-ui-express";

import getEnv from "./utils/validateEnv.js";
import router from "./router/index.js";
import setCookieLang from "./middleware/setCookieLang.js";
import swaggerSpec from "./swagger.js";

const app = express();
const env = getEnv();
const PORT = env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(setCookieLang);
app.use(
  session({
    genid: () => uuidv4(),
    name: "sid",
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      secure: !!(process.env.NODE_ENV === "production"),
    },
  }),
);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
