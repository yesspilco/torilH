const mongoose = require('mongoose');
const salonesSchema = require('../models/salones-models');

salonesSchema.statics = {
    crear: function(data,cb){
        const user= new this(data);
        user.save(cb);
    }
}

const SalonesModel= mongoose.model('Salones', salonesSchema);
module.exports= SalonesModel;