const express=require('express');
const app=express()
const http=require('http').createServer(app)

app.use(express.static(__dirname + '/public'))
app.get('/',(req,res)=>{
    res.sendFile('/home/rajkumar/Desktop/liveChatApp/public/index.html')
});

const io=require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log("connected..");
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    });
});

http.listen(2022,()=>{
    console.log("server start at port 2022...")
});