const chai = require('chai')
const { response } = require('express')
const superTest = require('supertest')
const portUrl = 'http://localhost:8080'
const request = superTest(portUrl)
const expect = chai.expect
const testingProducts =['6475311c945152f153d743fa']


describe('test e2e Productos',()=>{
  
    const product ={
        title:"test title",
        description:"test description",
        code:"test code",
        price:1000,
        status:true,
        stock:10,    
        category:"test category",
        thumbnail:"link",
    }
    it(`Testing obtencion de todos los productos-${portUrl}/api/products` , async () => {
            const response = await request.get(`/api/products`).send()
            const { statusCode, ok, _body } = response
            expect(statusCode).to.deep.equal(200);
            expect(ok).to.be.true;
            expect(_body.status).to.deep.equal('Sucess')
            expect(_body.payload.docs).to.be.an.instanceof(Array);
      });

      it(`Testing obtencion de un producto por ID - ${portUrl}/api/products/:pid`, async () => {
        const { statusCode, ok, _body } = await request.get(`/api/products/${testingProducts[0]}`);
        expect(statusCode).to.deep.equal(200);
        expect(ok).to.be.true;
        expect(_body).to.be.an.instanceof(Object);
      });

      it(`Testing de creacion de un producto - ${portUrl}/api/products/`, async () => {
        const response = await request.post(`/api/session/login`).send({
          email:"premium@correo.com",
          password:"1234"  
      })
         const {headers} =response   
               
      const arrayCookie = headers['set-cookie'][0].split("=")
        cookie = {
            name : arrayCookie[0],
            value : arrayCookie[1],
        }
         
         const { statusCode, ok, _body} = await request.post(`/api/products/`).send(product).set('Cookie',`${cookie.name}=${cookie.value}`);
         expect(statusCode).to.deep.equal(200);
         expect(ok).to.be.true;
         expect(_body).to.be.an.instanceof(Object);
      });
})