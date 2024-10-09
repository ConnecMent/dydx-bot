const pino = require('pino');
const pinoRoll = require('pino-roll');


const logger = pino({
  
  level: 'info',

  transport: {
    
    targets: [
      { target: 'pino-pretty' , 
        options : {
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname'
      },
     },
      { 
        target:'pino-roll',
          options : {
            file: process.env.MANUAL1,
            frequency:parseInt(process.env.MANUAL2),
            mkdir:true,
        }
      }
    ],
  },
});

setInterval(() => {
  const logLevels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];
  const randomLevel = logLevels[Math.floor(Math.random() * logLevels.length)];

  logger[randomLevel](`Logging at level: ${randomLevel}`);

}, 10 * 1000);
