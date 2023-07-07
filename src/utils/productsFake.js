const {faker} = require('@faker-js/faker')

faker.locale = 'es'

const generateProducts = ()=>{
    const arrayProduct = []
    const i = faker.random.numeric(100)
    for (let index = 0; index < i.length; index++) {
        arrayProduct.push({
            id:faker.database.mongodbObjectId(),
            neme:faker.commerce.productName(),
            description:faker.commerce.productDescription(),
            price:faker.commerce.price(3),
        })
        
    }
    return {arrayProduct}
}

module.exports = generateProducts