

var app = {

    token:null,
    socket:null,
    detectMotion:function(){

        window.addEventListener('devicemotion', function(event) {
            var x = event.acceleration.x;
            var y = event.acceleration.y;
            var z = event.acceleration.z;

            var ralpha = event.rotationRate.alpha;
            var rbeta = event.rotationRate.beta;
            var rgamma = event.rotationRate.gamma;

            var interval = event.interval;

            var $row1 = $('<p>',{ text:'x: '+x });
            var $row2 = $('<p>',{ text:'y: '+y });
            var $row3 = $('<p>',{ text:'z: '+z });
            var $row4 = $('<p>',{ text:'ralpha: '+ralpha });
            var $row5 = $('<p>',{ text:'rbeta: '+rbeta });
            var $row6 = $('<p>',{ text:'rgamma: '+rgamma });

            $('#motion-log').prepend($row1, $row2, $row3, $row4, $row5, $row6);

        });

    },
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
app.detectMotion();