
const mongoose = require('mongoose');
const authSchema = require('../models/provincia-models');

authSchema.statics = {
  findCountry: function (query, cb) {
    this.find(query, cb);
  }
}

const authModel = mongoose.model('provincias', authSchema);

module.exports = authModel;