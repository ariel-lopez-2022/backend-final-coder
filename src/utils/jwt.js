const jwt = require('jsonwebtoken');
const { PRIVATE_KEY_JWT } = require('../config/config');
const { sesionServices } = require('../service');
const { logger } = require('../config/config.winston');



const generateToken = (payload, expiration) => {
   const token = jwt.sign({payload}, PRIVATE_KEY_JWT, {expiresIn:`${expiration}`});
   return token;
}



const getPayload = (req,res,next) => {
   logger.info("getPayload")
   const headerAuth = req.headers.authorization
   
   if (!headerAuth) {
     res.status(403).json({
      error:'token inexistente'})
   }
  const token = headerAuth.split(' ')[1];
    
  if(token) {
    jwt.verify(token, PRIVATE_KEY_JWT, async (error, credential)=>{
         
         if (error){
            res.status(403).send({error:'error inesperado',description:error});
         }else{
            const user = await sesionServices.getUserId (credential.payload.id)
            req.payload = user
            next();
         }
     })
  } else{
    res.status(401).send({error:'no se encontro token'});
        
  }  
}

const getPayloadParams = (req,res,next) => {
   logger.info("getPayloadParams")
    const token = req.params.token
    if (!token) {
         res.status(403).sed({error:'token inexistente'})
     }
    if(token) {
      jwt.verify(token, PRIVATE_KEY_JWT, async (error, credential)=>{
          if (error){
             res.status(403).send({error:'error inesperado',description:error});
          }else{
             const user = await sesionServices.getUserId (credential.payload.id)
             req.payload = user
             next();
          }
      })
   } else{
     
     res.status(401).send({error:'no se encontro token'});
   }  
 }

 const getUserByToken = (token) => {
    logger.info("getUserByToken")
   return jwt.verify(token, PRIVATE_KEY_JWT, async (error, credential)=>{
       
      if (error){
         return null
      }else{
         const user = await sesionServices.getUserId (credential.payload.id)
         return user
      }
  })
}
 


module.exports ={
    generateToken,
    getPayload,
    getPayloadParams,
    getUserByToken
}