


class ProductService {
   constructor(dao){
      this.dao = dao
      
   }
 
   getProduct = (page, limit, sort, query) => this.dao.get (page, limit, sort, query)
   
 
   getProductId = (id) => this.dao.getId(id);
   
 
   addProduct = (product) => this.dao.create(product);
   
 
   updateProduct = (id, product) => this.dao.update(id, product);
   
 
   deleteProductId = (id) => this.dao.deleter(id);
   
}


  module.exports = ProductService 
 
