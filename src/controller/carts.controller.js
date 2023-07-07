
const { productServices, cartsServices } = require("../service/index");
const ProductService = require("../service/products.service");
const { mapProductCart, calculateQuantityTotal, calculateCartTotal } = require('../utils/calculosCarts');
const fecha = require("../utils/Fecha");
const { v4 } = require("uuid");
const { ObjectId } = require('mongodb');
const { logger } = require("../config/config.winston");



const createCarts = async (req, res) => {
  try {

    const cart = {
      priceTotal: 0,
      quantityTotal: 0,
      products: [],
    }
    await cartsServices.createCart(cart)

    return res
      .status(200)
      .json({
        msg: "Carrito Creado",
        playload: cart,
      })

  } catch (error) {
    return res
      .status(500)
      .json({
        msg: "Error al crear Carrito",
      })
  }
}

const addProductsToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params

    const cart = await cartsServices.getCartsId(cid);
    if (!cart) {
      return res.json({
        status: "error",
        message: "Carrito no Encontrado",
      })
    }

    const productBd = await productServices.getProductId(pid);
    if (!productBd) {
      return res.json({
        status: "error",
        message: "Producto no encontrado",
      })
    }
    if (cart.products.length == 0){
      const newCart = {
        priceTotal: productBd.price,
        quantityTotal: 1,
        products: [{ product: productBd._id, quantity: 1, price: productBd.price }]
      };
      await cartsServices.updateToCart(cid, newCart)
      return res.json({
        status: "susces",
        message: "Producto Agregado",
        cart: newCart
      })
    }
    
    let porductIndex = cart.products.findIndex(element => JSON.stringify(element.product._id) === JSON.stringify(productBd._id))
    if (porductIndex === -1) {
      
      const newCart = {
        priceTotal: cart.priceTotal + productBd.price,
        quantityTotal:cart.quantityTotal+1,
        products: [...cart.products, { product: productBd._id, quantity: 1, price: productBd.price }]
      };
      await cartsServices.updateToCart(cid, newCart)
      return res.json({
        status: "susses",
        message: "Producto Agregado",
        cart: newCart
      })
    } else{
      cart.products[porductIndex].quantity += 1 
      cart.products[porductIndex].price+= productBd.price 
      cart.quantityTotal = calculateQuantityTotal(cart.products)
      cart.priceTotal = calculateCartTotal(cart.products)
      await cartsServices.updateToCart(cid, cart)
      return res.json({
        status: "susses",
        message: "Producto Agregado",
        cart:cart
      })
      
    }

  } catch (error) {
    return res.status(500).json({
      msg: "Error",
      playload: error.message,
    })
  }

}

const bdgetCartId = async (req, res) => {

  try {
    const { cid } = req.params
    const cart = await cartsServices.getCartsId(cid);

    if (!cart) {
      return res.status(401).json({
        msg: "Carrito no Encontrado",
      })
    }
    if (cart.products.length === 0){
      return res.json({
        status: "error",
        message: "Carrito Vacio",
        payload: cart
      })
    } else{
      return res.json({
        status: "sussces",
        message: "Carrito con productos",
        payload:cart
      })
    }

  } catch (error) {
    return res.status(500).json({
      msg: "error",
      payload: error.message,
    })
  }


}


const emptyToCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const Cart = await cartsServices.getCartsId(cid);
    Cart.products = [];
    Cart.quantityTotal = 0
    Cart.priceTotal = 0
    await cartsServices.updateToCart(cid, Cart)
    return res.json({
      status: "success",
      message: "Carrito se vacio con exito",
    })
    

  } catch (error) {
    return res.status(500).json({
      msg: "error",
      playload: error.message,
    })
  }

}

const deleteProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params

    const cart = await cartsServices.getCartsId(cid);
    if (!cart) {
      return res.json({
        status: "error",
        message: "Carrito no Encontrado",
      })
    }

    const productBd = await productServices.getProductId(pid);
    if (!productBd) {
      return res.json({
        status: "error",
        message: "Producto no encontrado",
      })
    }
    let porductIndex = cart.products.findIndex(element => JSON.stringify(element.product._id) === JSON.stringify(productBd._id))
   
    if (porductIndex === -1){
      return res.json({
        status: "error",
        message: "Producto no encontrado en el carrito",
      })
    }else{
      
      cart.products.splice(porductIndex, 1)
      cart.quantityTotal = calculateQuantityTotal(cart.products),
       cart.priceTotal = calculateCartTotal(cart.products),
      await cartsServices.updateToCart(cid, cart)
      return res.json({
        status: "success",
        message: "Producto Eliminado",
        payload:cart
      })
    }

  } catch (error) {
    return res.status(500).json({
      msg: "error",
      playload: error.message,
    })
  }
}


const updateToQuantityProduct = async (req, res) => {
  try {
    const { cid, pid, } = req.params;
    const { quantity = 0 } = req.body;

    const Cart = await cartsServices.getCartsId(cid);
    if (!Cart) {
      return res.status(400).json({
        msg: "Carrito no encontrado",
        ok: false,
      })
    }
    const product = await productServices.getProductId(pid);
    if (!product) {
      return res.status(400).json({
        msg: "Producto no encontrado en base de Datos",
        ok: false,
      })
    }
    const findProductTocart = Cart.products.findIndex(({ product }) => product._id == pid)

    if (findProductTocart === -1) {
      return res.status(400).json({
        msg: "Producto no encontrado en el Carrito",
        ok: false,
      })
    }
    Cart.products[findProductTocart].quantity += quantity
    Cart.priceTotal = calculateCartTotal(Cart.products)
    await cartsServices.updateToCart(cid, Cart)
    return res.status(201).json({
      msg: "Cantidad Actualizada",
      Cart: Cart
    })


  } catch (error) {
    return res.status(500).json({
      msg: "error",
      playload: error.message,
    })
  }

}


const updateToProductsToCart = async (req, res) => {

  try {
    const { cid } = req.params
    const Cart = await cartsServices.getCartsId(cid);
    if (!Cart) {
      return res.status(400).json({
        msg: "Carrito Inexistente",
        ok: false,
      })
    }
    const { products = [] } = req.body
    let { productCartList } = await mapProductCart(products)

    const upateCart = {
      priceTotal: calculateCartTotal(productCartList),
      quantityTotal: calculateQuantityTotal(productCartList),
      products: productCartList,
    }
    await cartsServices.updateToCart(cid, upateCart)

    return res.json({
      msg: "Carrito Actualizado",
      payload: { productCartList, productsNotFound },
      carts: Cart
    })

  } catch (error) {
    return res.status(500).json({
      msg: 'Error',
      payload: error.message,
    })
  }
}

const pucharse = async (req, res) => {
  logger.info("pucharse")
  
  try {
    const { email } = req.user.user
    let sinStock = []
    let tiketTotal = 0
    const { cid } = req.params
    const cart = await cartsServices.getCartsId(cid);
    if (!cart) {
      return res.json({
        msg: "Carrito no Encontrado",
        playload: cart,
      })
    }

    for (let i = 0; i < cart.products.length; i++) {
      const productBd = await productServices.getProductId(cart.products[i].product._id)

      if (productBd.stock >= cart.products[i].quantity) {
        tiketTotal += productBd.price * cart.products[i].quantity
        productBd.stock = productBd.stock - cart.products[i].quantity
        await productServices.updateProduct(productBd.id, productBd)
      } else {
        sinStock.push(productBd.id)
      }

    }
    let { productCartList } = await mapProductCart(sinStock)
    const upateCart = {
      priceTotal: calculateCartTotal(productCartList),
      quantityTotal: calculateQuantityTotal(productCartList),
      products: productCartList,
    }
    await cartsServices.updateToCart(cid, upateCart)
    const ticket = {
      code: v4(),
      purchase_datetime: new Date(),
      amount: tiketTotal,
      parchaser: email,
    }
    const createTicket = await cartsServices.createTicket(ticket)

    if (!createTicket) {
      return res.json({
        msg: "No se Pudo Crear Ticket",
        playload: createTicket,
      })
    }
    return res.json({
      msg: "Tiket Creado",
      playload: createTicket,
      ProductSinStock: sinStock,
    })
  } catch (error) {
    return res.json({
      msg: "error",
      payload: error.message,
    })
  }
}



module.exports = {
  createCarts,
  addProductsToCart,
  bdgetCartId,
  deleteProductToCart,
  emptyToCart,
  updateToQuantityProduct,
  updateToProductsToCart,
  pucharse,
}

