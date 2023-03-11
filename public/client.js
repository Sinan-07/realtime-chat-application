const socket = io()
let Name;
let textareea = document.querySelector('#textarea')
let messagearea = document.querySelector('.message_area')
do{
  Name = prompt('Please enter your name')
}while(!Name)

textareea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})
function sendMessage(message) {
let msg = {
    user:Name,
    message:message.trim()
}
appendMessage(msg,'outgoing')
textareea.value=''
scroll();
socket.emit('message', msg)
}

function appendMessage(msg, type){
 let maindiv = document.createElement('div')
 let classname = type
 maindiv.classList.add(classname,'message')

 let markup =`
 <h4>${msg.user}</h4>
 <p>${msg.message}</p>
 `

 maindiv.innerHTML = markup
 messagearea.appendChild(maindiv);
}
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scroll();
})

function scroll(){
    messagearea.scrollTop= messagearea.scrollHeight;
}