var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb+srv://khoapham:GetDN9YpL6rHE8vF@cluster0-qah5q.mongodb.net/BookStore240919?retryWrites=true&w=majority",  {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.log("Mongo connect error " + err)
    }else{
        console.log("Mongo connected successfull.");
    }
});

//Models
const Category = require("./Models/Category");

app.get("/", function(req, res){
    res.render("home", {page:"home"});
});

app.get("/cate", function(req, res){
    Category.find(function(err, items){
        if(!err){
            res.render("home", {page:"cate", cates: items});
        }else{
            console.log(err);
        }
    });
});

app.post("/cate", function(req, res){
    var Cate = Category({
        name: req.body.txtTitle,
        ordering: req.body.txtOrder,
        active: req.body.chkActive==undefined?false:true,
        idBooks:[]
    });
    Cate.save(function(err){
        if(!err){
            res.redirect("http://localhost:3000/cate");
        }else{
            console.log(err);
        }
    });
})

// Edit Category
app.get("/cate/edit/:id", function(req, res){
    Category.findById(req.params.id, function(err, item){
        res.render("home", {page:"cate_edit", cate:item});
    });
});



app.post("/cate/edit/:id", function(req, res){

    Category.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.txtTitle,
            ordering: req.body.txtOrder,
            active: req.body.chkActive==undefined?false:true, 
            idBooks:[]
        }, function(err){
            if(!err){
                res.redirect("http://localhost:3000/cate");
            }else{
                res.send(err);
            }
    });

});

app.get("/cate/delete/:id", function(req, res){
    Category.findByIdAndRemove(req.params.id, function(err){
        if(!err){
            res.redirect("http://localhost:3000/cate");
        }
    })
});








app.get("/login", function(req, res){
    res.render("login");
});