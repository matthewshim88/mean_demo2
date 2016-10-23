app.controller('appointmentController', function($scope, $location, sessionFactory, appointmentFactory){
  $scope.appointments= [];

  $scope.index = function(){
    appointmentFactory.getAll(function(data){
      $scope.appointments = data;
    });
    sessionFactory.checkUser(function(data){
      $scope.currUser = data.user;
      if(!$scope.currUser){
        $location.url('/')
      }
    });
  }
  $scope.index();

  $scope.add = function(){
    $scope.errors = [];

    if($scope.newAppointment.date == undefined || $scope.newAppointment.time == undefined || $scope.newAppointment.complaint == undefined || $scope.newAppointment.complaint == ""){
      $scope.errors.push("All 3 fields are required!");
      return;
    }

    if($scope.newAppointment.complaint.length < 10){
      $scope.errors.push("Complaint must be at least 10 characters long!");
    }

    if($scope.newAppointment.date < new Date()){
      $scope.errors.push("You can only add a future appointment!");
    }

    if(8 > $scope.newAppointment.time.getHours() || $scope.newAppointment.time.getHours() > 16){
      $scope.errors.push("Appointment must be between 8 am and 5 pm");
    }

    var user_count = 0;
    var appt_count = 0;
    var plan = new Date($scope.newAppointment.date);
    for(var i = 0; i < $scope.appointments.length; i++){
      var compare = new Date($scope.appointments[i].date);
      if(compare.getTime() == plan.getTime()){
        if($scope.appointments[i].patient_name == $scope.currUser){
          $scope.errors.push("User can only make one appointment per day");
          break;
        }
        appt_count++;
      }
    }
    if(appt_count >= 3){
      $scope.errors.push("The Doctor can only take 3 appointments per day, please Reschedule");
    }

    if($scope.errors.length > 0){
      return;
    }

    $scope.newAppointment.patient_name = $scope.currUser.name;
    appointmentFactory.add($scope.newAppointment, function(returnAppts){
      $scope.appointments.push(returnAppts);
      $scope.index();
      $location.url('/dashboard');
    });
    //clears the form empty after new appt is made
    $scope.newAppointment = {};
  }

  $scope.remove = function(appointment){
    $scope.errorRemove = "";
    var now = Date.now();
    var compare = new Date(appointment.date);
    if(compare.getTime() - now < 86400000){
      $scope.errorRemove = "You must cancel at least 24 hours in advance";
      return;
    }
    appointmentFactory.remove(appointment._id);
    appointmentFactory.getAll(function(data){
      $scope.appointments = data;
    })
  }

  $scope.isPast = function(appointment){
    var now = Date.now();
    var compare = new Date(appointment.date);
    return !(now > compare.getTime());
  }

})
