const mongoose = require('mongoose');
const facturaSchema = require('../models/factura-models');

facturaSchema.statics = {
    crear: function(data,cb){
        const user= new this(data);
        console.log(user);
        user.save(cb);
    }
}

const FacturaModel= mongoose.model('Facturas', facturaSchema);
module.exports= FacturaModel;