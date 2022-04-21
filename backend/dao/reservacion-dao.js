const mongoose = require('mongoose');
const reservacionSchema = require('../models/reservacion-models');

reservacionSchema.statics = {
    crear: function(data,cb){
        const reservacion= new this(data);
        reservacion.save(cb);
    },
}

const reservacionModel= mongoose.model('Reservacion', reservacionSchema);
module.exports= reservacionModel;