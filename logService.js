import pino from 'pino'

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

export default logger;
