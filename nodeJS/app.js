var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");
    
mongoose.Promise = global.Promise;                                               // about what this line for please refer to Note about the mongoose promise library, Section 27, Lecture 255
mongoose.connect("mongodb://localhost/blogPost", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());            //need to put this after body-parser
app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    dateCreated: {type:Date, default:Date.now},
    body: String
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?dpr=1&auto=format&fit=crop&w=1950&q=60&cs=tinysrgb",
//     body: "This is a test blog post where the image size i think is too bog for testing, hope this practice and app could get me a job as an web dev."
// });

app.get("/", function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req,res){
   Blog.find({}, function(err,allpost){
       if(err){
           console.log("ERROR GETTING BLOG POSTS");
       }else{
           res.render("index",{postS:allpost});
       }
   });
});

app.get("/blogs/new", function(req, res) {
    res.render("new");
});

app.post("/blogs",function(req,res){
   var dataN = req.body.blog;
   req.body.blog.body = req.sanitize(req.body.blog.body);  //this would remove the script tag on textarea(body of the blogpost)
   
   Blog.create(req.body.blog,function(err,ndb){
       if(err){
           console.log("creating error");
       }else{
           res.redirect("/blogs");
       }
   });
});

app.get("/blogs/:id",function(req, res) {
    var idDia= req.params.id;
    
    Blog.findById(idDia,function(err,df){
        if(err){
            console.log("showing APP GET ID ERROR");
        }else{
            res.render("shows",{idShows:df});
        }
    });
});

app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err,thb){
        if(err){
            console.log("ERROR");
        }else{
            res.render("edit",{editBlog:thb}); 
        }
    });
});

app.put("/blogs/:id",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);  //this would remove the script tag on textarea(body of the blogpost)
    
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedB){
        if(err){
            res.redirect("/blog");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
       if(err){
           console.log("delete error");
       }else{
           res.redirect("/blogs");
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("=====STARTING BLOGPOST APP=====");
});