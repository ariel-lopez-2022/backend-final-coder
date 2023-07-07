


const DtoUsers = (users) => {
  let newUsersDto = users.map(user=>({
  firstName:user.firstName,
  lastName:user.lastName,
  email:user.email,
  cart:user.cart,
  rol:user.rol,
  last_connection:user.last_connection,
  documents:user.documents,
}))   
  return (newUsersDto)
} 

module.exports = {
   
    DtoUsers,
}

