const mongoose=require('mongoose');
const express=require('express');
const User=require('../models/user');
const router=express.Router();

router.get('/getall',function(req,res){
  User.find({},function(err,data){
    if(err) console.log(err);
    else {
      res.send(data);
    }
  });
});

router.get('/nearby', function(req, res, next){
    User.geoNear(
        {type: 'Point', coordinates: [parseFloat(req.query.lon), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(users){
        res.send(users);
    }).catch(next);
});

router.post('/nearby',function(req,res,next){
  User.create(req.body,function(user){
    if(user!=null)
      res.send({status:'1'});
    else
      res.send({status:'0'});
  }).catch(next);
});

router.put('/nearby/:id',function(req,res,next){
  User.findByIdAndUpdate({_id:req.params.id},req.body,function(user){
    console.log(user);
    if(user!=null)
      res.send({status:'1'});
    else
      res.send({status:'0'});
  });
});

router.delete('/nearby/:id',function(req,res){
  User.findByIdAndRemove({_id:req.params.id},req.body,function(user){
    console.log(user);
    if(user!=null)
      res.send({status:'1'});
    else
      res.send({status:'0'});
  });
});

module.exports=router;
