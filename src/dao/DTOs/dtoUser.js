
  class DTOsUser {
    
    constructor(user) {
       
        this.id = user._id,
        this.firstName = user.firstName,
        this.lastName = user.lastName,
        this.rol = user.rol,
        this.last_connection = user.last_connection,
        this.documents = user.documents
        this.cart= user.cart  
    }
  }
  
  module.exports = DTOsUser;