

const Session = function(desktopSocket, token, io){

    this.deviceSocket = null;
    this.desktopSocket = desktopSocket;
    this.token = token;
    this.io = io;

};

Session.prototype.emit = function(){



};


module.exports = Session;