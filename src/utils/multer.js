const multer = require('multer');
const mimeTypes = require('mime-types');
const { TYPE_DOCUMENTS } = require('../config/config');
const typeDocuments = ['application/pdf','image/jpeg','image/png']

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     const include = typeDocuments.includes(file.mimetype)
    if (!include){
       return cb(new Error('type file not support'));
    }
    req.logger.info('fieldName = ' + file.fieldname);
    let route = 'documents';
      
    if (file.fieldname == 'thumbnail') route = 'profile';
    if (file.fieldname == 'document') route = 'documents';
    if (file.fieldname == 'image') route = 'products';
    req.route =  `documents/${route}`
    cb(null, __dirname + `/../public/documents/${route}`);
  },
  filename: function (req, file, cb) {
    req.logger.info('req file type - ' + file.mimetype);
    let filename = `${Date.now()}-${file.originalname}`;
    let extencion =  mimeTypes.extension(file.mimetype)   
    req.filename = `${filename}.${extencion}`
    cb(null, req.filename);
  },
});

const uploader = multer({ storage: storage });

const saveDocs = uploader.fields([
{ name: 'thumbnail' },
{ name: 'image' },
{ name: 'Comprobante de domicilio' },
{ name: 'Comprobante de estado de cuenta' }, 
{ name: 'Identificación' },
{ name: 'document' },
{ name: 'product' }]);

const upload = multer();



module.exports = {
  saveDocs,
 
};
