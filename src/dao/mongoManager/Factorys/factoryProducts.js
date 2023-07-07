const {PERCIST} = require("../../../config/config");
const connectMongo = require("../../../config/config.db")

let productDao={};
(async ()=>{
    switch (PERCIST) {
    case "Mongo":
        connectMongo
        const percistenciaMongo = await require("../BdProductManager")
         productDao.get =  percistenciaMongo.get
         productDao.getId =  percistenciaMongo.getId
         productDao.create =  percistenciaMongo.create
         productDao.update =  percistenciaMongo.update
         productDao.deleter =  percistenciaMongo.deleter
        break;

    case "fs":
        const percistenciaFs = await require("../../fsManager/ProductManager")
        productDao.get =  percistenciaFs.get
        productDao.getId =  percistenciaFs.getId
        productDao.create =  percistenciaFs.create
        productDao.update =  percistenciaFs.update
        productDao.deleter =  percistenciaFs.deleter


    break;
    
    default:
        const percistenciaMongoDefault = await require("../BdProductManager")
        productDao.get =  percistenciaMongoDefault.get
        productDao.getId =  percistenciaMongoDefault.getId
        productDao.create =  percistenciaMongoDefault.create
        productDao.update =  percistenciaMongoDefault.update
        productDao.deleter =  percistenciaMongoDefault.deleter
        connectMongo
        break;
}})();

module.exports = productDao