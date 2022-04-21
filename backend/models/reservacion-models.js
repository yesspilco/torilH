const mongoose= require('mongoose');
const Schema= mongoose.Schema;
var SchemaTypes=mongoose.Schema.Types;

const Autoincrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/El-Toril");

Autoincrement.initialize(connection);


mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true)
const reservacionSchema= new Schema({
    fechaR:{
        type: Date,
        required: true
    },    
    Finicio:{
        type: Date,
        required: true,
    },
    Ffin:{
        type: Date,
        required: true,
    },
    estado:{
        type: String, 
        required: true,
        default: 'Pendiente',
    },    
    cliente:{
        type: SchemaTypes.ObjectId,
        required: true
    },
    activo:{
        type: Number,
        default:1,
        required: true
    },total:{
        type:Number,
        required:true,
    },dias:{
        type:Number
    },observacion:{
        type:String
    }
    
},{
    timestamps: true
  }
);

reservacionSchema.plugin(Autoincrement.plugin,{
    model: 'reservacins',
    field: 'reservacionId',
    startAt: 1,
    incementBy: 1
});

module.exports=reservacionSchema;

