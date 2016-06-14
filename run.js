'use strict';

const express       = require('express');
const randomToken   = require('rand-token');
const app           = express();
const server        = require('http').Server(app);
const io            = require('socket.io')(server);
const bodyParser    = require('body-parser');

const Session = require('./session');

const sessionStore = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Here is where the browser first connects to our server and passes the socket
io.on('connection', (socket) => {

    const queryToken = socket.request._query.token;

    if(queryToken.length > 1){

        for(var i=0;i<sessionStore.length;i++){

            let mySession = sessionStore[i];

            if(mySession.token === queryToken){

                mySession.desktopSocket = socket;
                socket.join(queryToken);

                io.sockets.in(queryToken).emit('message', {message:'New socket joined room'});

            }

        }

    }else{
        // generate random short token
        const token = randomToken.generate(5);
        socket.emit('joined', {status:1, token:token});

        const session = new Session(socket, token, io);
        socket.join(token);
        sessionStore.push(session);

        io.sockets.in(queryToken).emit('message', {message:'Initial socket joined room'});

    }

});

app.set('view engine', 'ejs');

// localhost:3030/static
app.use('/static', express.static('static'));

app.get('/:token', (req, res)=>{

    const token = req.params.token;

    res.render('landing', {token:token});

});

app.get('/', (req, res) => {

    res.render('landing', { token:'' });

});

server.listen(3030, ()=>{

    console.log('Server listening on port 3030');

});