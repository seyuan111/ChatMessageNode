const socket = io()

const participantsTotal = document.getElementById('participants-total')
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage()
})

socket.on('clients-total', (data) => {
    participantsTotal.innerText = `Total Participants: ${data}`
})

function sendMessage(){
    console.log(messageInput.value)
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data)
    addMessage(true, data)
    messageValue.value = ""
}

socket.on('chat-message', (data) => {
    console.log(data)
    addMessage(false, data)
})

function addMessage(isOwnMessage, data){
    const element = `<li class="${isOwnMessage ? "message-right" : "message-left"}">
    <p class="message">${data.message}</p>
    <span>${data.name} ${moment(data.dateTime).fromNow()}</span>
</li>`

messageContainer.innerHTML += element
}