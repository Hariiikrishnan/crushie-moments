//jshint esversion:6
require('dotenv').config();

const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const ObjectId = require("mongodb").ObjectId;

// var db = "mongodb://localhost:27017/example";
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
});

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const momentschema = new mongoose.Schema({
  date: String,
  time :String,
  place:String,
  color:String,
  saw:String,
  response:String
})

const Moment = new mongoose.model("Moment",momentschema);

app.get("/post",function(req,res){
  
    Moment.find({},function(err,results){
      if(err){
        console.log("Error Occured "+err);
        window.alert(err);
      }else if(results){
        // console.log(results);
        res.json(results)
      }
    })

  // res.render("home");
});

// app.get("/post/:id",function(req,res){
//   const id =req.params.id;
//   Moment.findOne({_id:ObjectId(id)},function(err,result){
//     if(err) throw err;
//     res.json(result)
//   });
// });
app.post("/post",function(req,res){

    // console.log(req.body);
   const date = req.body.date;
   const time = req.body.time;
   const place = req.body.place;
   const color = req.body.color;
   const saw = req.body.saw;
   const response = req.body.response;
 
  const moment = new Moment({
    date:date,
    time:time,
    place:place,
    color:color,
    saw:saw,
    response:response

});


// moment.save();
     moment.save(function(err,result){
      if (err) throw err;
      res.send("Data Sent" + result);
    })
})
app.post("/edit/:postid",function(req,res){
  // console.log(req.body + "from Server side!");
  const id =req.params.postid;
  // console.log(req.params.postid);
  console.log(req.params.postid);
  Moment.findOneAndUpdate({_id:ObjectId(id)},req.body,
		{ new: true, useFindAndModify: false },function(err,result){
    if(err) throw err;
    res.json(result)
  })
});
app.delete("/post/:postid",function(req,res){
   console.log(req.params.postid + " server side");
  Moment.deleteOne({ _id:req.params.postid},function(err,message){
    if(err) throw err;
    res.json({message : "Moment Deleted Successfully!"});
  })
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send(`Red Alert ${err.stack}`);
});
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
