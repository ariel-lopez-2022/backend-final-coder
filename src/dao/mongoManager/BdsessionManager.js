const userModel = require ('../models/user.model')

class BdsessionManager {
  create = (user)=>{
    const { firstName, lastName, email, age, password,rol, cart} = user
    return userModel.create({firstName , lastName, email, age, password, rol, cart })
}
  getUsers = () => userModel.find()

  get = (email, password) => userModel.findOne({email, password});
  
  getId = (id) => userModel.findById(id);
  
  getEmail = (email) => userModel.findOne(email);

  
  update = (id, user) => userModel.findByIdAndUpdate(id, user)

  updatePassword = (id, newPassword) => userModel.findByIdAndUpdate(id ,{password:newPassword})

  updateRole = (id, newRole) => userModel.findByIdAndUpdate(id , {rol:newRole})

  updatedocs = (id, docs) => userModel.findByIdAndUpdate(id , docs)

  deleteUser = (id) => userModel.findByIdAndDelete(id) 
}
module.exports = new BdsessionManager