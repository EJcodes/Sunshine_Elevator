const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    companyName: String,
    address: String, 
    elevators: Number,
    floors: String,
    maintenance: Boolean,
    cabRenovation: Boolean,
    circbRenovation:Boolean,
    newConstruction: Boolean,
    buttonRepair: Boolean,
    fireAlarmRepair: Boolean,
    repair: Boolean,
    email: String,
    phoneNumber: Number,
    secondaryNumber: Number
    
},
                                     {timestamps: true}
  );

  const Client = mongoose.model("client", clientSchema);

  module.exports = Client;