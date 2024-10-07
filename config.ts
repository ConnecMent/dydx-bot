// import env file with 'dotenv'

import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] });

const SECONDS = 1000;
const MINUTE = 60 * SECONDS;

const config = {
  interval: Number(process.env.INTERVAL) * MINUTE,
  strategiesFilePath: ['strategies/strategy-example-1.json'],
};

export default config;
