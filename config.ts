// import env file with 'dotenv'

import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] });

const config = {
  interval: Number(process.env.INTERVAL),
  logFile: process.env.LOG_FILE!,
  logFrequency: process.env.LOG_FREQUENCY!,
};

export default config;
