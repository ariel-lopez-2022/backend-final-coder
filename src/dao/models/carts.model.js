const mongoose = require('mongoose')

 const cartsColection = "carts"

 const cartsSchema = new mongoose.Schema({
      
     products: {
           type:[
              {
                product:{
                  type: mongoose.Schema.Types.ObjectId,
                   ref:"products",
                },
                quantity:Number,
                price:Number,
                
               }
            ],
            default:[],
     },
     priceTotal:Number,
     quantityTotal:Number,
     
    })   


const cartsModel = mongoose.model(cartsColection , cartsSchema);
module.exports = cartsModel;

