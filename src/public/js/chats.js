const socket = io()

const listChatsElement = document.getElementById('list-chats')
listChatsElement.innerHTML ="" 
socket.on('init-chats', ( chats ) => {
    
     chats.forEach((chat) => {
     listChatsElement.innerHTML += `
	 	 <li id=${chat._id} >${chat.userEmail} - ${chat.message}</li></br>
	 	 `
	 })
})

socket.on('add-message', (newMessage) => {
	listChatsElement.innerHTML += `<li id="${newMessage._id}">${newMessage.userEmail} - ${newMessage.message}</li>`
})

socket.on('delete-message'), (message)=>{
    //const message = document.getElementById(`${message._id}`)
   // message.remove(); 
 
 }