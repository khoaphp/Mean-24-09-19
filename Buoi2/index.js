var express = require("express");
var app = express();
app.listen(3000);

var mang = [];

app.get("/xuly/:un/:pw", function(req, res){
    var u = new User(
        req.params.un,
        req.params.pw
    );
    mang.push(u);
    res.send("OK");
});

app.get("/ds", function(req, res){
    var chuoi = `
    <table width="300" border="1">
    <tr>
        <td>Username</td><td>Password</td>
    </tr>`;

    var r = Math.floor(Math.random() * mang.length) ;

    var dem = 0;
    mang.forEach(function(u){
        if(dem != r){
            chuoi = chuoi + `
            <tr>
                <td>` + dem + " - " + u.UN +`</td>
                <td>` + u.PW + `</td>
            </tr>
        `;
        }else{
            chuoi = chuoi + `
            <tr bgColor="yellow">
                <td>` + dem + " - " + u.UN +`</td>
                <td>` + u.PW + `</td>
            </tr>`;
        }
        dem = dem + 1;
    });

    chuoi = chuoi + `</table>`;
    res.send(chuoi);
});

function User(un, pw){
    this.UN = un;
    this.PW = pw;
}


app.get("/demo", function(req, res){
    console.log("ABC");
    res.json(mang);
    //res.end();
    //res.redierrect("./trangchu");
});

function SinhVien(hoten, namsinh){
    this.HOTEN = hoten;
    this.NAMSINH = namsinh
}

app.get("/xuly/:namsinh/:hoten", function(req, res){
    var ns = req.params.namsinh;
    var tuoi = 2019 - ns;
    var name = req.params.hoten;
    res.send(name + tuoi);
});

app.get("/trangchu", function(req, res){
    res.send(`
    <h2>Trang chu</h2>
    <a href="./lienhe">Lien he</a>
    `);
});

app.get("/lienhe", function(req, res){
    res.send(`
    <h2>Lien he</h2>
    <a href="./trangchu">Trang chu</a>
    `);
});

app.get("/", function(req, res){
    res.send("Hello");
});

app.get("/abc", function(req, res){
    res.send("Abc");
});

app.post("/abc", function(req, res){
    res.send("POST_ABD");
});

