import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  MONGO_URI: string | undefined;
  STRIPE_SECRET_KEY: string | undefined;
  JWT_SECRET: string | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  STRIPE_SECRET_KEY: string;
  JWT_SECRET: string;
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
