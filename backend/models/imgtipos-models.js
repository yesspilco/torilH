const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const imgTipoSchema = new Schema({
    tipo: {
        type: SchemaTypes.ObjectId,
        required: 1
    },
    imagen: {
        type: String
    },
    estado: {
        type: Number,
        default:1
    }

}, {
    timestamps: true
});

module.exports = imgTipoSchema;