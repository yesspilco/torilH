const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

const Autoincrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/El-Toril");

Autoincrement.initialize(connection);


mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)
const facturaSchema = new Schema({
    numero: {
        type: Number,
        unique: true,
        required: true
    },
    fecha: {
        type: Date,
        required: true,
    },
    idreserva: {
        type: SchemaTypes.ObjectId,
        required: true,
    },
    idcliente: {
        type: SchemaTypes.ObjectId,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
    iva: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    activo: {
        type: Number,
        default: 1,
    },
    estado: {
        type: String,
        defaul: "Pendiente"
    }
}, {
    timestamps: true
});
module.exports = facturaSchema;