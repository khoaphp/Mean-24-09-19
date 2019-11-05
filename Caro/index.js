var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var playerX;
var playerO;
var vuamoidanh;
var mangDangUynh = [];

io.on("connection", function(socket){
    console.log(socket.id);

    socket.hoten = "Teo";

    socket.on("playerX-dangky", function(data){
        playerX = new Player( socket.id, data );
        
        // Báo cho mọi người biết X
        socket.broadcast.emit("co-nguoi-dangky-X", data);

        // Báo cho X
        socket.emit("dangky-X-thanhcong", data);

    });

    socket.on("playerO-dangky", function(data){
        playerO = new Player( socket.id, data );
        
        // Báo cho mọi người biết )
        socket.broadcast.emit("co-nguoi-dangky-O", data);

        // Báo cho O
        socket.emit("dangky-O-thanhcong", data);

    });

    socket.on("player-danh", function(data){
        console.log(data);

        if(vuamoidanh != socket.id && ( socket.id==playerX.ID || socket.id==playerO.ID ) && !checkVitri(data) ){
            
            vuamoidanh = socket.id;

            if(playerX.ID == socket.id){
                io.sockets.emit("X-danh-ne", data);
            }

            if(playerO.ID == socket.id){
                io.sockets.emit("O-danh-ne", data);
            }

            mangDangUynh.push( new Uynh(socket.id), data );
        }
        

    });

});

function checkVitri(vitri){
    var kq = false;
    mangDangUynh.forEach(function(item){
        if(item.VITRI == vitri){
            kq = true;
        }
    });
    return kq;
}

app.get("/", function(req, res){
    res.render("home");
});

function Player(id, name){
    this.ID = id;
    this.NAME = name;
}

function Uynh(player, vitri){
    this.PLAYER = player,
    this.VITRI = vitri
}