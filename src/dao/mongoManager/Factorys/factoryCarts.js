const {PERCIST} = require("../../../config/config");
const connectMongo = require("../../../config/config.db")

let cartsDao={};
(async ()=>{
    switch (PERCIST) {
    case "Mongo":
        connectMongo
        const percistenciaMongo = await require("../BdCartManager")
         cartsDao.get =  percistenciaMongo.get
         cartsDao.getId =  percistenciaMongo.getId
         cartsDao.create =  percistenciaMongo.create
         cartsDao.update =  percistenciaMongo.update
         cartsDao.deleter =  percistenciaMongo.deleter
        break;

    case "fs":
        const percistenciaFs = await require("../../fsManager/ProductManager")
        cartsDao.get =  percistenciaFs.get
        cartsDao.getId =  percistenciaFs.getId
        cartsDao.create =  percistenciaFs.create
        cartsDao.update =  percistenciaFs.update
        cartsDao.deleter =  percistenciaFs.deleter


    break;
    
    default:
        const percistenciaMongoDefault = await require("../BdCartManager")
        cartsDao.get =  percistenciaMongoDefault.get
        cartsDao.getId =  percistenciaMongoDefault.getId
        cartsDao.create =  percistenciaMongoDefault.create
        cartsDao.update =  percistenciaMongoDefault.update
        cartsDao.deleter =  percistenciaMongoDefault.deleter
        connectMongo
        break;
}})();

module.exports = cartsDao