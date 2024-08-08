// import env file with 'dotenv'
// require('dotenv').config({ path: '.env' });

import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const config = {
  interval: Number(process.env.INTERVAL),
};

export default config;
