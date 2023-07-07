const BdChatsManager = require('../dao/mongoManager/BdChatsManager')
const Chats = new BdChatsManager()
const {emitMessage} = require('../utils/soket.io')
const {emitDeleteMj} = require('../utils/soket.io')



const getsendMessage = async(req, res)=>{
    const getMessage = await Chats.getMessage()
  if (!getMessage){
      return res.json({
      msg: 'No se puedo Visualizar Mensajes',
   });      
  }else{
    return res.json({
      msg: 'Chats',
      chats:getMessage
    });      
 }

}

const sendMessage = async(req, res)=>{
  const message = req.body
  const saveMessage = await Chats.sendMessage(message)
 
  if (!saveMessage){
    return res.json({
      msg: 'No se puedo enviar Mensaje',
   });      
  }else{
      emitMessage(saveMessage)     
      return res.json({
        msg: 'Mensaje Enviado',
        playlist:saveMessage,
      })  
    }
}



const deleteMessage = async (req, res)=>{
  const id = req.params.chid
  const deleteMessaje = await Chats.deleteMessage(id)
  if (!deleteMessaje){
      return res.json({
      msg: 'No se pudo eliminar',
   });      
  }else{
    emitDeleteMj(deleteMessaje)
    return res.json({
      msg: 'Mensaje Eliminado',
      chats:deleteMessaje
    });      
 }

}


module.exports ={
    sendMessage,
    getsendMessage,
    deleteMessage
}