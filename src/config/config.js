const dotenv = require('dotenv');
const path = require('path');
const { program } = require('commander');
const { logger } = require('./config.winston');

program.requiredOption('--mode <mode>', 'modo de ejecucion del servidor', 'development');
program.parse();

const ambiente = program.opts().mode;

dotenv.config({
  path: path.join(__dirname, ambiente == 'development' ? '../../.env.development' : '../../.env.production'),
});
const TYPE_DOCUMENTS = [
  'Identificación'
  ,'Comprobante de domicilio',
  'Comprobante de estado de cuenta'
]
logger.info(`"mode: ${process.env.ENVIRONMENT}`)
module.exports ={
  NODE:process.env.ENVIRONMENT,
  MONGODBURL: process.env.MONGODBURL,
  PRIVATE_KEY_JWT: process.env.PRIVATE_KEY_JWT,
  REGISTER_STRATEGY: process.env.REGISTER_STRATEGY,
  LOGIN_STRATEGY: process.env.LOGIN_STRATEGY,
  JWT_STRATEGY: process.env.JWT_STRATEGY,
  PORT : process.env.PORT,
  COOKIE_USER : process.env.COOKIE_USER,
  COOKIE_FORGOT: process.env.COOKIE_FORGOT,
  PERCIST:process.env.PERCIST,
  APIKEY_STRIPE:process.env.APIKEY_STRIPE,
  MEILING:{
    user:process.env.USERMAILING,
    password:process.env.PASSWORDMAILING

  },
  TYPE_DOCUMENTS,

}
