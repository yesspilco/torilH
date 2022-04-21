const mongoose = require('mongoose');
const hosteriaSchema = require('../models/hosteria-models');

hosteriaSchema.statics = {
    crear: function(data,cb){
        const user= new this(data);
        console.log(user);
        user.save(cb);
    }
}

const HosteriaModel= mongoose.model('Hosteria', hosteriaSchema);
module.exports= HosteriaModel;