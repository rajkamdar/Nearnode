const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');

app.use(express.static('./public'));

app.use(bodyParser.json());

app.use('/api',require('./routes/api'));

app.use(function(err,req,res,next){
  console.log(err);
   res.status(422).send({error: err.message});
});

mongoose.connect('mongodb://localhost/nearnode');
mongoose.Promise = global.Promise;

app.listen(process.env.port||4000,function(){
  console.log("server started");
});
