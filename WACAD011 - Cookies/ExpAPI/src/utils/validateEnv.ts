import { cleanEnv, port, url } from "envalid";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

function getEnv() {
  return cleanEnv(process.env, {
    PORT: port({ default: 7777 }),
    DATABASE_URL: url(),
  });
}

export default getEnv;
