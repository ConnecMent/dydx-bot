// import env file with 'dotenv'

import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] });

const config = {
  interval: Number(process.env.INTERVAL),
};

export default config;
