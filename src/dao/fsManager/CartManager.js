const fs = require("fs");

const writeFile = (path, Carts) =>
  fs.promises.writeFile(path, JSON.stringify(Carts));
  
const readFile = async (path) => {
  const GetCards = await fs.promises.readFile(path,{ encoding: 'utf-8' } );
  const aux = GetCards ? GetCards : "[]";
  const Result = JSON.parse(aux);
  return Result;
};

  class CardsManager {
      constructor(path) {
        this.Cards = [];
        this.path = path;
        
      }
    
    CreateCarts = async () => {
      const Carts = await readFile (this.path);
      const id = Carts.length
      Carts.push({
        id,
        products:[]
      })
    
      await writeFile(this.path, Carts);
      return id; 
    };
     
    getCatrs = async (id)=>{
      const carts = await readFile(this.path);
        if (carts[id]) {
            return carts[id];
        } 
        else {
           return ({ msg: "Carrito No encontrado"} );
        }
      };
       
    addProductCart = async (cid, pid) => {
      const carts = await readFile(this.path);
      if (carts[cid]) {
          const productsIndex = carts[cid].products.findIndex((p) => p.id == pid);
          if (productsIndex !== -1) {
              carts[cid].products[productsIndex].quantity++;
              
          } else {
              carts[cid].products.push({ id: pid, quantity: 1 });
              
          }
          await writeFile(this.path, carts);
          return carts
      } else {
        return ({ msg: "Carrito No encontrado"} );
      }
    }
 
}  

module.exports = CardsManager;


