const winston = require('winston');
const optionWinston ={
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5,
    },
    colors:{
      fatal:'red',
      error:'magenta',
      warning:'yellow',
      info:'cyan',
      http:'blue',
      debug:'green',

    }
}

const loggerProd = winston.createLogger({
    levels:optionWinston.levels,
   transports:[
              
        new winston.transports.File({filename:'.errors.log',
        level:"info",
        format:winston.format.combine(
           winston.format.colorize({colors:optionWinston.colors}),
           winston.format.simple()
        )}),
    ]
})

const loggerDev = winston.createLogger({
    levels:optionWinston.levels,
    transports:[
        new winston.transports.Console
        ({level:"debug",
        format:winston.format.combine(
            winston.format.colorize({colors:optionWinston.colors}),
            winston.format.simple()
         )
    }),
    ]
})

const mdwLooger = (req, res, next)=>{
    req.logger = (process.env.NODE_ENV)? loggerProd :loggerDev ;
    req.logger.http(`${req.method} `);
    next();
}
module.exports ={
    mdwLooger,
    logger: process.env.NODE_ENV ? loggerProd :loggerDev 
}  