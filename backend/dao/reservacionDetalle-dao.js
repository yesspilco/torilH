const mongoose = require('mongoose');
const DetalleSchema = require('../models/reservacionDetalle-models');






DetalleSchema.statics = {
    create: function(data,cb){
        const reservacionDet= new this(data);
        reservacionDet.save(cb);
    },
}

const reservacionDetalleModel= mongoose.model('ReservacionDetalle',DetalleSchema);
module.exports= reservacionDetalleModel;
