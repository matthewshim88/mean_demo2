var mongoose = require('mongoose');
var Schema = mongoose.Schema

var UserSchema = new Schema({
  name : {type : String},
  // _questions:[{type: Schema.Types.ObjectId, ref:"Topic"}],
  // _answers:[{type: Schema.Types.ObjectId, ref:"Answer"}]
}, {timestamps:true});

mongoose.model("User", UserSchema);
