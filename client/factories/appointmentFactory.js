app.factory('appointmentFactory', ["$http", function($http){
  var factory = {};

  factory.getAll = function(callback){
    $http.get('/appointments')
    .then(function(data){
      callback(data.data);
    })
  }

  factory.add = function(appt, callback){
    $http.post('/appointments/new', appt)
    .then(function(data){
      callback(data.data);
    })
  }

  factory.remove = function(appt_id){
    $http.post('/appointments/remove', {id: appt_id});
  }

  return factory;
}]);
