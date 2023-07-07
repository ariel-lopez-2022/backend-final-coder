const { Router } = require('express');
const 
{ getProductsBd,
  addProductBd,
  getProductIdBd,
  updateProductBd,
  deleteProductBd,
  getmockingproducts 
} = require('../controller/products.controller');
const { adminPermission} = require('../utils/middleware/isUser');
const passportCustom = require('../utils/passportCall');
const { JWT_STRATEGY } = require('../config/config');

const router = Router();
router.get("/mockingproducts", getmockingproducts)
router.get("/", getProductsBd)
router.post("/", passportCustom(JWT_STRATEGY), adminPermission,addProductBd)
router.get("/:pid", getProductIdBd)
router.put("/:pid", passportCustom(JWT_STRATEGY), adminPermission, updateProductBd)
router.delete("/:pid", passportCustom(JWT_STRATEGY), adminPermission, deleteProductBd)
       
 

module.exports = router;