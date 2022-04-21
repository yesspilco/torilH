const mongoose = require('mongoose');
const reservaTempSchema = require('../models/reserva-temporal');






reservaTempSchema.statics = {
    crear: function(data,cb){
        const user= new this(data);
        console.log("datos a guardar",data);
        user.save(cb);
    },
}

const reservaTempModel= mongoose.model('ReservaTemp', reservaTempSchema);
module.exports= reservaTempModel;