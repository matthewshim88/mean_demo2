var mongoose = require('mongoose');
var User = mongoose.model("User");

module.exports = (function(){
  return {
    login : function(req, res){
      User.findOne({name: req.body.name}, function(err, user){
        if(!user){
          var user = new User(req.body)
          user.save(function(err, data){
            if(err){
              return res.json({status:false})
            }else{
              req.session.user = data;

              req.session.save();
              console.log(req.session.user)
              return res.json({status: true, user: data})
            }
          })
        }else{
          //if there is a user in the DB that matches
          req.session.user = user;
          req.session.save();
          console.log(req.session.user)
          return res.json({status: true, user:user})
        }
      })
    },
    checkUser : function(req, res){
      if(req.session.user){
        res.json({user: req.session.user})
      }else{
        res.json({user: null})
      }
    },
    findUser : function(req, res){
      console.log(req.body);
      User.findOne({_id: req.params.id}, function(err, user){
        if(err){
          console.log(err);
          return res.json(err);
        }
        res.json(user);
      })
    },
    find: function(req, res){
      Question.findOne({_id : req.params.id}, function(err, question){
        if(err){
          console.log(err);
          return res.json(err);
        }
        res.json(question);
      })
    },
    logout: function(req, res){
      req.session.destroy();
      res.redirect('/')
    }
  }

})();
