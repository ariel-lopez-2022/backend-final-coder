const chai = require('chai')
const { response } = require('express')
const superTest = require('supertest')
const portUrl = 'http://localhost:8080'
const request = superTest(portUrl)
const expect = chai.expect
const testingCart = ['6477b1f0067388613335dcb1']


describe('test e2e carrito',()=>{
    
    it(`Testing de Creacion de carritos `, async () => {
        const response = await request.post(`/api/session/login`).send({
            email: 'saltaportal210@gmail.com',
            password: '12345',
          });
          const { headers } = response;
          const array = headers['set-cookie'][0].split('=');
          cookie = {
            name: array[0],
            value: array[1],
          };
        const { statusCode, ok, _body } = await request.post('/api/carts').set('Cookie', `${cookie.name}=${cookie.value}`);
        expect(statusCode).to.deep.equal(200);
        expect(ok).to.be.true;
        expect(_body).to.be.an.instanceof(Object);
      });

      it(`Testing de obtencion de carrito por ID `, async () => {
        const { statusCode, ok, _body } = await request.get(`/api/carts/${testingCart}`);
        expect(statusCode).to.deep.equal(200);
        expect(ok).to.be.true;
        expect(_body).to.be.an.instanceof(Object);
      });





})