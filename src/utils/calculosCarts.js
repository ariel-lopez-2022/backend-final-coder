
const { productServices } = require('../service')

const calculateCartTotal = (products) =>{
    return products.reduce((acc, prod )=> acc + prod.price * prod.quantity,0)
}
const calculateQuantityTotal = (products) =>{
    return products.reduce((acc, prod )=> acc + prod.quantity ,0)
}

const mapProductCart = async (products)=>{
    
 
 let productCartList = []
 let productsNotFound = []
  
 for(const id of products) {

    const indexProducts = productCartList.findIndex(({product})=> product === id)
     
    if (indexProducts === -1){
        const productBd = await productServices.getProductId(id)
        
        if(productBd){
            productCartList.push({
                product: id,
                quantity: 1,
                price:productBd.price,
                  
            }) 
        }else{
             productsNotFound.push(id)
        }
    } else{
        productCartList[indexProducts].quantity++
    }
  }
   
    return {productCartList, productsNotFound}

}


module.exports ={
    calculateCartTotal,
    mapProductCart,
    calculateQuantityTotal
}