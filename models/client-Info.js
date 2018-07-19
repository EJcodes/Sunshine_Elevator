const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    paid: {type: Boolean, default: false },
    companyName: String,
    address: String, 
    elevators: Number,
    floors: String,
    service: String,
    email: String,
    phoneNumber: Number,
    secondaryNumber: Number,
    elevType: String,
    reviewer: {type: Schema.Types.ObjectId, ref: 'User'},
    myComment: String
    
},
    {
        timestamps: true
    }
  );

  const Client = mongoose.model("client", clientSchema);

  module.exports = Client;