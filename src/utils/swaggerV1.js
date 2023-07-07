const swaggerJsSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');

const option = {
    definition:{
     openapi: '3.0.0',
     info:{
         title:'API',
         description:'Api Ecommerce', version:'1.0.0'
     }
    },
    apis: [`${__dirname}/../api-docs/**/*.yml`]
 }
  
 const spec = swaggerJsSDoc(option)
 const serve = swaggerUi.serve
 const ui = swaggerUi.setup(spec)

  

module.exports = {
    serve,
    ui
}