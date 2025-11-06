import { cleanEnv, num, port, str, url } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    SESSION_SECRET: str(),
    HASH_SALT_ROUNDS: num(),
    DATABASE_URL: url(),
  });
}

export default validateEnv;
