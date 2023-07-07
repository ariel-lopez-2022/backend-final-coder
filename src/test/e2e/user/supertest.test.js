const chai = require('chai')
const { response } = require('express')
const superTest = require('supertest')
const portUrl = 'http://localhost:8080'
const request = superTest(portUrl)
const expect = chai.expect

describe('test e2e User',()=>{
    const user ={
        firstName:"test firstName",
        lastName: "test lastName",
        age:30,
        email:"test@correo.com",
        password: "1234",
        rol:"premium"
    }
    
    it(`Testing Register User-${portUrl}/api/session/register` , async () => {
            const response = await request.post(`/api/session/register`).send({
              ...user  
            })
            const { statusCode, ok, _body } = response
            expect(statusCode).to.deep.equal(200);
            expect(ok).to.be.true;
            expect(_body.status).to.deep.equal('success')
    });
    
    let cookie; 

    it(`Testing login User-${portUrl}/api/session/login` , async () => {
        const response = await request.post(`/api/session/login`).send({
            email:"test@correo.com",
            password:"1234"  
        })
        
        const { statusCode, ok, _body, headers } = response
        
        const arrayCookie = headers['set-cookie'][0].split("=")
        cookie = {
            name : arrayCookie[0],
            value : arrayCookie[1],
        }

        expect(statusCode).to.deep.equal(200);
        expect(ok).to.be.true;
        expect(_body.token).to.be.ok
           
        
    });
    
    it(`Testing current ${portUrl}/api/session/current` , async () => {
        const response = await request.get(`/api/session/current`).set('Cookie',`${cookie.name}=${cookie.value}`)
        const { statusCode, ok, _body, headers} = response
        expect(statusCode).to.deep.equal(200);
        expect(ok).to.be.true;
       });
})
