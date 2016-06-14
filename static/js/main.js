

var app = {

    token:null,
    socket:null,
    connectSocket:function(){

        app.socket = io.connect('/?token='+token);

        app.socket.on('joined', function(data){

            app.token = data.token;

            if(!token) {
                var $visit = $('<p>', {text: 'http://wsc.proxima.si/' + app.token});
                $('#link').append($visit);
            }else{
                app.token = token;
            }

        });

        app.socket.on('message', function(data){

            var $visit = $('<p>', {text: data.message});
            
            $('#messages').append($visit);

        });

    }

};

app.connectSocket();