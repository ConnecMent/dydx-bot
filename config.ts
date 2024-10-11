// import env file with 'dotenv'

import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] });

const SECONDS = 1000;
const MINUTE = 60 * SECONDS;

const config = {
  logFile: process.env.LOG_FILE!,
  logFrequency: process.env.LOG_FREQUENCY!,
  interval: Number(process.env.INTERVAL) * MINUTE,
  strategiesFilePath: process.env.STRATEGIES_FILE_PATH as string,
  mnemonic: process.env.MNEMONIC!,
};

export default config;
