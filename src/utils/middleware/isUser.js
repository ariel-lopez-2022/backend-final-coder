const  adminPermission  =  async  (req,  res,  next)  =>  {
    const {user}= req.user
        if (user.rol  !==  "administrador" && user.rol  !==  "premium") {
        return  res.status(401).json({
          status:  'error',
          message:  'Usuario  no  autorizado  ',
        });
     }
   next() 
}   
const  admin  =  async  (req,  res,  next)  =>  {
  const {user}= req.user
    if (user.rol  !==  "administrador") {
      return  res.status(401).json({
        status:  'error',
        message:  'Usuario  no  autorizado  ',
      });
    }
 next() 
}   

const  userPermission  =  async  (req,  res,  next)  =>  {
  const {user}= req.user
  if  (!user  ||  user.rol  !==  'user')  {
    return  res.status(401).json({
      status:  'error ',
      message:  'Usuario  no  autorizado  ',
    });
 }
 next() 
}   

   

module.exports = {
  adminPermission,
  userPermission,
  admin,
} 