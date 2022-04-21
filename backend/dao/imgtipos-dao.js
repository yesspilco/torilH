const mongoose = require('mongoose');
const authSchema = require('../models/imgtipos-models');

authSchema.statics = {
  create: function (data, cb) {
    const imgproducto = new this(data);
    imgproducto.save(cb);
  }
}

const imgTipoModel = mongoose.model('imgtipos', authSchema);

module.exports = imgTipoModel;