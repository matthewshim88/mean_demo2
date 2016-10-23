app.factory('sessionFactory', ["$http", "$location", function($http, $location){

  var factory = {};

  factory.login = function(user){
    $http.post('/login', user)
    .then(function(data){
      if(data.data.status){
        $location.url('/dashboard')
      }else{
        alert("SOMETHING WENT WRONG NOOO")
      }
    });
  }

  factory.checkUser = function(callback){
    $http.get('/checkUser')
    .then(function(data){
      callback(data.data);
    });
  }

  factory.findUser = function(userID, callback){
    $http.get('/getUser/' + userID)
    .then(function(user){
      callback(user.data);
    });
  }

  return factory;
}]);
