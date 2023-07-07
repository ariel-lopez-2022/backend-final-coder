
const userModel = require('../dao/models/user.model');

class SessionService{
    constructor(dao){
     this.dao = dao
    }


getUsers = () => this.dao.getUsers()

getSession = (email, password) => this.dao.get({email, password});

getUserId = (id) => this.dao.getId(id);

getEmail = (email) => this.dao.getEmail(email);
  
createUser = (user)=>   this.dao.create(user)

updateUser= (id, user)=>  this.dao.update(id,user)

updateUserRole = (id, newRole)=>this.dao.updateRole(id, newRole)

updateUserDoc = (id, docs)=>this.dao.updatedocs(id, docs)

deleteUser = (id) => this.dao.deleteUser(id) 



}
module.exports=  SessionService