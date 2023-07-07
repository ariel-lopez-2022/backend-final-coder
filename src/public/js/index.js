const socket = io();

socket.on('init-products', (products)=>{
    const rowProducts = document.getElementById('rowProducts');
    rowProducts.innerHTML =" ";
    products.forEach(product => {
        rowProducts.innerHTML +=

           `<div class="card col-3 m-2 border border-4 id="${product.id}" style="width: 18rem;">
             <img src="${product.thumbnail}" class="card-img-top" alt="">
              <div class="card-body">
                <h5 class="card-title text-center">${product.title}</h5>
                <p class="card-text text-center mb-0 ">${product.description}</p>
                <p class="card-text text-center">cod: ${product.code}</p>
                <h2 class="card-text text-center ">$ ${product.price}</h2>
                <p class="card-text text-center ">Cantidad: ${product.stock}</p>
                <div class="d-flex justify-content-center">
                   <button type="button" class="btn btn-primary">Agregar</button>
                </div>
            </div>
           </div>`
    });
});

socket.on('delete-product'), (id)=>{
   const produc = document.getElementById("id")
   produc.remove(); 

}

socket.on('add-product'), (add)=>{
    const rowProducts = document.getElementById('rowProducts');
    rowProducts.innerHTML =
    `<div class="card col-3 m-2 border border-4 id="${add.id}">
      <img src="" class="card-img-top" alt="">
       <div class="card-body">
         <h5 class="card-title text-center">${add.title}</h5>
         <p class="card-text text-center">${add.description}</p>
         <h3 class="card-text text-center ">$ ${add.price}</h3>
         <p class="card-text text-center ">cantidad: ${add.stock}</p>
         <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary">Agregar</button>
         </div>
     </div>
    </div>`
}



const deleteRealTimeProduct = async (id) =>{
    const valor = document.getElementById("valor").value
    const Delete = await Product.deleteProduct (valor);
  
    if (Delete.erro){
      res.json(Delete);
    }else{
     emitDeleteProduct(id)
      res.json(Delete);
   }
}