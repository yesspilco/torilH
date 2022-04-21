const mongoose = require('mongoose');
const cabaniaSchema = require('../models/cabanias-model');






cabaniaSchema.statics = {
    crearCabania: function(data,cb){
        const cabania= new this(data);
        cabania.save(cb);
    }
}

const cabaniaModel= mongoose.model('cabania', cabaniaSchema);
module.exports= cabaniaModel;