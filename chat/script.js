const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = sessionStorage["username"]
appendMessage('You joined',2)
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}:${data.message}`,3)

})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`,2)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`,2)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`${message}`,1)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message,number=0) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
  if(number==1){
          messageElement.setAttribute("style", "margin-left: 70%; color:#fff; background-color: rgb(42 164 250 / 68%);  height: auto; padding: 10px; border-radius: 12px 12px 0 12px; ");
}
if(number==2){
        messageElement.setAttribute("style", "  background-color: #ff80009e;     text-align: center;");
}
if(number==3){
  messageElement.setAttribute("style", "  background-color: #7392d6;   margin-right: 70%;   height: auto; padding: 10px; border-radius: 12px 12px 12px 0;");
}
}