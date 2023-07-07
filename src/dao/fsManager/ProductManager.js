const fs = require("fs");

const writeFile = (path, Products) =>
  fs.promises.writeFile(path, JSON.stringify({ products: Products }));

const readFile = async (path) => {
  const GetProducts = await fs.promises.readFile(path);
  const Result = JSON.parse(GetProducts);
  return Result;
};

class ProductDaoFS {
  constructor(path) {
    this.Product = [];
    this.path = path;
  }

  CreateFile = async () => {
    const File = fs.existsSync(this.path);
    if (File) {
      const { products } = await readFile(this.path);
      this.Product = products;
    } else {
      await writeFile(this.path, this.Product);
    }
  };

  get = async (limit) => {
    const { products } = await readFile(this.path);
    if (!limit) {
      return products;
    } else {
      const arrayFiltrado = products.slice(0, limit);
      return arrayFiltrado;
    }
  };

  create = async (objeto) => {
     
    if (objeto.title || objeto.description || objeto.code || objeto.price || objeto.Status || objeto.stock || objeto.category) {
      const { products } = await readFile(this.path);
      this.Product = products;
      this.Product.push({
        id: this.Product.length++,
        ...objeto
      });
      await writeFile(this.path, this.Product);
      return {msg:"Producto Agregado Correctamente"};
    } else {
      return { msg:"Falta Campos Obligatorios" };
    }
  };


  

  getId = async (id) => {
    const { products } = await readFile(this.path);
    const ProductId = products.find((product) => product.id === parseInt(id));
    if (ProductId) {
      return ProductId;
    } else {
      return null ;
    }
  };


  update = async (id, body) => {

    const { products } = await readFile(this.path);
    this.Product = products
    const UpdateProduct = this.Product.findIndex((element) => element.id === id);
   
    if (UpdateProduct !== -1) {
      const id = this.Product[UpdateProduct].id;
      this.Product[UpdateProduct] = {
        id,
        ...body
      };
      await writeFile(this.path, this.Product);
      return ("El Producto se Actualizo Corectamente");
    } else {
      return { msg:"El Producto a Actualizar no se encontro" };
    }

  };

  delete = async (id) => {
    const { products } = await readFile(this.path);
    this.Product = products
    const FindIndex = this.Product.findIndex((element) => element.id === id);
    if (FindIndex !== -1) {
      const newArrayProducts = this.Product.filter(
        (product) => product.id !== id);
      await writeFile(this.path, newArrayProducts);
      return {msg: "El Producto se Elimino Corectamente"};;
    } else {
      return { msg:"El Producto a Eliminar no se encontro" };
    }
  };
}

module.exports = ProductDaoFS ;
