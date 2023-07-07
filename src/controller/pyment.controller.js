const { Console } = require("winston/lib/winston/transports")
const { productServices, cartsServices } = require("../service")
const paymentsService = require("../service/payments.service")



const payments = async (req, res)=>{
   const {id} = req.query
   const cart = await cartsServices.getCartsId(id)
   if (!cart) {
    return res.json({
      status: "error",
      message: "Carrito no encontrado",
    })
  }
  const config ={
    amount:cart.priceTotal,
    currency:'usd'
  }
  
  const createPaymentsIntent = await paymentsService.createPaymentsIntent(config)
  
  res.send({
    status:'success',
    payload:createPaymentsIntent,
  })
}

module.exports = payments