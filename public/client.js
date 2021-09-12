const socket=io()
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message__aria')
let name;
do{
    name=prompt('please enter your name')
}while(!name)

textarea.addEventListener('keyup',(event)=>{
    if(event.key==='Enter'){
        sendMessage(event.target.value)
    }
})

function sendMessage(mail){
    let msg={
        user:name,
        message:mail.trim(),

    }
    appendMessage(msg,'outgoing')
    textarea.value=""
    scrollTobottom();

    socket.emit('message',{
        user:name,
        message:mail
    })
}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type;
    mainDiv.classList.add(className,'message')
    let markup=`
        <h4>${msg.user}</h1>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}

 
// recive massage in client..
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollTobottom();
})

function scrollTobottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}