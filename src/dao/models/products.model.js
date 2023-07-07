const mongoose = require('mongoose')
const mongoosepagination = require ('mongoose-paginate-v2')

const productsCollection = 'products'
const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,  
    },
    description: {
        type: String,
        require: true, 
    },
    code:{
        type: String,
        require: true, 
    },
    price:{
        type: Number,
        require: true, 
    },
    status:Boolean,
    stock: {
        type: Number,
        default:1,
    },    
    category:{
        type: String,
        require: true, 
    },
    owner:{
        type: "String",
        default:"administrador"
    },
    
    thumbnail:String,

})
productSchema.plugin(mongoosepagination)
const productModel = mongoose.model(productsCollection, productSchema);

module.exports = productModel;