const { productServices } = require("../service/index");
const { invalidProduct } = require("../utils/creatorMsg");
const CustomError = require("../utils/customError");
const generateProducts = require("../utils/productsFake");
const { ERROR_PRODUCT } = require("../utils/variablesError");





const getProductsBd = async (req, res) => {
  try {
    const { limit, page, sort, ...query } = req.query;
    const products = await productServices.getProduct(page, limit, sort, query);
    
    if (!products){
      return res.json({
        status: "error",
        msg:"no hay Productos",
      })
    }
  

    return res.json({
      status: "Sucess",
      payload: products,
    })
  } catch (error) {
      return res.json({
      status: "Error",
      playload: "error al intentar mostrar productos",
     })
  }
};


const getProductIdBd = async (req, res) => {
  try {
    
    const id = req.params.pid
    const getProductId = await productServices.getProductId(id);
    if (!getProductId){

      return res.json({
        status: "401",
        msg:"Producto no encontrado",
       
      })
    }
    return res.json({
      status: "200",
      msg:"Producto encontrado",
      playload: getProductId,
    })

  } catch (error) {
    return res.json({
    status: "Error",
    playload: "error al intentar mostrar producto",
   })}
}
    

const addProductBd = async (req, res, next) => {
  try {
     const objeto= Object.keys(req.body).length === 0
    if (objeto){
       return next (CustomError.createError({code:ERROR_PRODUCT, msg: invalidProduct(), typeError:"ERROR_PRODUCT"})) 
     }
     const product = req.body;
    
    if (req.user.user.rol == "premium") {
      product.owner = req.user.user.email;
      const newproduct = await productServices.addProduct (product);
        return res.json({
         status: "success",
         msg: "Producto Creado con exito",
         newProduct:newproduct,
     })
    }     
    
    const newproduct = await productServices.addProduct(product);
    return res.json({
      status: "success",
      msg: "Producto Creado con exito",
      newProduct:newproduct,
    })
  

   
  } catch (error) {
    return res.json({
      status: "error",
      playload:"error al crear producto",
    })}
}

const updateProductBd = async (req, res) => {
  try {
    
    const id = req.params.pid
    const product = req.body
   const UpdateProductId = await productServices.updateProduct(id, product);
     
    return res.json({
    status: "Sucess",
     playload:UpdateProductId,
    })
    
  } catch (error) {
    return res.json({
      status: "error",
      playload:"error al actualizar producto",
    })}
}

const deleteProductBd = async (req, res) => {
 try {
  const id = req.params.pid;

  const productExist = await productServices.getProductId(id);
  if (!productExist) {
    return res.json({
      status: "401",
      message: "Producto No Existe",
       });
  }

  if (req.user.user.rol === 'administrador') {
    const deleteproduct = await productServices.deleteProductId(id);
    return res.json({
      status: "success",
      message: "Producto Eliminado",
    });
  }
  
  if (req.user.user.rol === 'premium') {
    if (req.user.user.email == productExist.owner) {
      const deleteproduct = await productServices.deleteProductId(id);
      return res.json({
      status: "success",
      message: "Producto Eliminado",
      });
    } else {
      return res.json({
        status: "success",
        message: "Usuario sin Permiso para Eliminar este producto",
      });
    }
  } else {
    return res.json({
      status: "success",
      message: "Usuario sin Permiso para Eliminar este producto",
    });
  }
 } catch (error) {
  return res.json({
    status: "error",
    message: "No se pudo eliminar Producto",
  });
  }
}
const getmockingproducts = async (req,res)=>{
  try {
    const products = generateProducts()
    return res.json({
     status: "Sucess",
     playload: products,
    })
  } catch (error) {
    return res.json({
    status: "Error",
    playload: "error al intentar mostrar producto",
   })}
}
    


module.exports = {
  getProductsBd,
  getProductIdBd,
  addProductBd,
  updateProductBd,
  deleteProductBd,
  getmockingproducts,
}
