const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
    });


  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
  
  io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
      });
    });

    var _typingIndicator = document.querySelector('.typing'),
    _input = document.querySelector('#message-input'),
    idleTime = 400,
    idleTimer = null,
    inputValue,
    indicatorState = {
        active : 'is-typing-active',
        init : 'is-typing-init'
    };

function showIndicator(){
    _typingIndicator.classList.add(indicatorState.init);
}

function activateIndicator(el){
    _typingIndicator.classList.add(indicatorState.active);
    inputValue = el.value;
    detectIdle(el);
}

function removeIndicator(){
    _typingIndicator.classList.remove(indicatorState.init, indicatorState.active);
}

function detectIdle(el){
    if (idleTimer) {
        clearInterval(idleTimer);
    }
    
    idleTimer = setTimeout(function(){
        if (getInputCurrentValue(el) === inputValue) {
            _typingIndicator.classList.remove(indicatorState.active);
        }
    }, idleTime);
}

function getInputCurrentValue(el){
    var currentValue = el.value;
    return currentValue;
}

function initTypingIndicator() {
    _input.onfocus = function(){
        showIndicator();
    };

    _input.onkeyup = function() {
        activateIndicator(this);
    };

    _input.onblur = function(){
        removeIndicator();
    };
}

initTypingIndicator();
