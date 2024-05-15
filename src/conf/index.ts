import 'dotenv/config';
import { z } from 'zod';

const env = z
  .object({
    APP_PORT: z.coerce.number().min(1000).default(3000),
    ENV: z.union([z.literal('dev'), z.literal('prod')]).default('dev'),
    MODEL_URL: z.string().default('file://models/model.json'),
    KEY_FILENAME_PATH: z.string().default('./key.json'),
  })
  .parse(process.env);

export const conf = {
  port: env.APP_PORT,
  env: env.ENV,
  modelUrl: env.MODEL_URL,
  keyFilenamePath: env.KEY_FILENAME_PATH,
};
