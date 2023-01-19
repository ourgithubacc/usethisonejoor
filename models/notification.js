const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Device = new Schema({
    deviceId : String,
    platform : String
});

const DeviceSchema = mongoose.model('Device', Device);
module.exports = DeviceSchema