const mongoose = require('mongoose');
const pagoSchema = require('../models/pago-models');

pagoSchema.statics = {
    crear: function(data,cb){
        const user= new this(data);
        console.log(user);
        user.save(cb);
    }
}

const PagoModel= mongoose.model('Pago', pagoSchema);
module.exports= PagoModel;