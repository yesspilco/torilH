const mongoose = require('mongoose');
const otrosSchema = require('../models/otroservicio-models');

otrosSchema.statics = {
    crear: function(data,cb){
        const user= new this(data);
        user.save(cb);
    }
}

const otrosServiciosModel= mongoose.model('otrosServicios', otrosSchema);
module.exports= otrosServiciosModel;