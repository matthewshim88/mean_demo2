var path = require('path');
var session = require('./../controllers/sessionController.js');
var appointments = require('./../controllers/appointmentController.js');

module.exports = function(app){
  app.post('/login', session.login);
  app.get('/checkUser', session.checkUser);
  app.get('/logout', session.logout);
  app.get('/getUser/:id', session.findUser);
  app.get('/appointments', appointments.show);
  app.post('/appointments/new', appointments.create);
  app.post('/appointments/remove', appointments.remove);
}
