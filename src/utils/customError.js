const {ERROR_GENERICO } = require("./variablesError");


class CustomError {
   
    static createError({code=500, msg="Error no identificado", typeError=ERROR_GENERICO})
    {
       const error = new Error(msg)
       error.code= code
       error.typeError= typeError
       
    return error
        
    }
}
module.exports = CustomError;