const mongoose = require('mongoose');
const otrosDetallesSchema = require('../models/otros-detalles-models');






otrosDetallesSchema.statics = {
    create: function(data,cb){
        const reservacionDet= new this(data);
        reservacionDet.save(cb);
    },
}

const otrosDetallesModel= mongoose.model('otrosDetalles',otrosDetallesSchema);
module.exports= otrosDetallesModel;
