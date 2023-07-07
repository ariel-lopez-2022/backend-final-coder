const passport = require("passport");
const passportLocal = require("passport-local");
const { hashPassword, comparePassword } = require("./hashPassword");
const {Strategy, ExtractJwt } = require('passport-jwt');
const { generateToken } = require("./jwt");
const { COOKIE_USER, JWT_STRATEGY, REGISTER_STRATEGY, LOGIN_STRATEGY, PRIVATE_KEY_JWT } = require("../config/config");
const { sesionServices, cartsServices } = require("../service");
const { default: mongoose } = require("mongoose");
const { logger } = require("../config/config.winston");

const cookieEstractor = (req) =>{
 
  let token = null;
  if(req && req.cookies) {
    token = req.cookies[COOKIE_USER]
  }
  console.log(token) 
  return token;
   
} 


const initPassaport = () => {
  
passport.use(
  JWT_STRATEGY, new Strategy ({
      jwtFromRequest:ExtractJwt.fromExtractors([cookieEstractor]),
     secretOrKey: PRIVATE_KEY_JWT
}, async(jwt_payload, done) => {
    try {
          const {payload} = jwt_payload
          const user = await sesionServices.getUserId (payload.id);
          done (null, {user})
    } catch (error) {
          done(error)
    }
})
);



  passport.use(
    REGISTER_STRATEGY ,
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },async (req, username, password, done) => {
                
        try {
          const { firstName, lastName, age, rol } = req.body;
           const exitEmail = await sesionServices.getEmail({email:username});
            if (exitEmail) {
              done(false,{status:"error", message:"Usuario ya registrado con este Emial"} );
            } else {
              const hash = await hashPassword(password);
              const cart = await cartsServices.createCart({
                priceTotal:0, 
                quantityTotal:0,
                products:[],
               })
              const id = mongoose.Types.ObjectId(cart);
              if (username === "adminCoder@coder.com") {
                const user = await sesionServices.createUser({
                  firstName: firstName,
                  lastName: lastName,
                  age:age,
                  email: username,
                  password: hash,
                  cart:id,
                  rol: "administrador",
                });
                done(false,{status:"success", message:"Usuario Registrado con Exito"} );
              } else {
                 if (rol === "premium"){
                  const user = await sesionServices.createUser({
                    firstName: firstName,
                    lastName: lastName,
                    age:age,
                    email: username,
                    password: hash,
                    cart:id,
                    rol:"premium"
                  }); 
                 } else{
                  
                  const user = await sesionServices.createUser({
                    firstName: firstName,
                    lastName: lastName,
                    age:age,
                    email: username,
                    password: hash,
                    cart:id,
                    
                  }); 
                 }done(null,false,{status:"success", message:"Usuario Registrado con Exito"} );
              }
            }

        } catch (error) {
             
            done(error)
        }
      }
    )
  );
 

  passport.use(
    LOGIN_STRATEGY ,
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },async (req,username, password, done) => {
      try {
          const user = await sesionServices.getEmail({email:username})
          const isVadidPassword = await comparePassword(password, user.password)
          if (user && isVadidPassword) {
            const token = generateToken({id:user.id, rol:user.rol},"1h")
           if (token) {
              done(null,{
                 user:user,
                 token:token,
                 status:"success", 
                 message:"Usuario logueado con exito"
                }); 
            } else{
              done(null,{status:"error", message:"No se puedo generar Token"} ); 
            }
           
          }else{
            done(null, {user:false});  
          }
         
         } catch (error) {
          done(null, error);
              
        }
      }
    )
  );
  
};

module.exports =  initPassaport
