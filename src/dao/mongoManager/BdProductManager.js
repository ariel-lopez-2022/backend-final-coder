const productModel = require('../models/products.model')

class ProductDaoMongo {
  
  get = (page = 1, limit =15 , sort = '', query ={}) => productModel.paginate(query, { page, limit, sort:{price:sort}})
  create = (product) => productModel.create(product);
  getId = (id) => productModel.findById(id);
  update = (id, product) => productModel.updateOne({_id:id}, product);
  deleter = (id) => productModel.deleteOne({_id:id});

}

module.exports = new ProductDaoMongo()
