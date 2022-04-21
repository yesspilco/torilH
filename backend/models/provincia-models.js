const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var connection = mongoose.createConnection("mongodb://localhost:27017/El-Toril");
autoIncrement.initialize(connection);

const provinciaSchema = new Schema({
    nombreProvincia: {
        type: String
    }
}, {
    timestamps: true
});

provinciaSchema.plugin(autoIncrement.plugin, {
    model: 'provincias',
    field: 'provinciaId',
    startAt: 1,
    incrementBy: 1
});

module.exports = provinciaSchema;