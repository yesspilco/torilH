const mongoose= require('mongoose');
const Schema= mongoose.Schema;
var SchemaTypes=mongoose.Schema.Types;

const Autoincrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/El-Toril");

Autoincrement.initialize(connection);


mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true)

const otroservicioSchema= new Schema({
    servicio:{
        type: SchemaTypes.ObjectId, 
        required: true,
        sparse: true
    },
    precio:{
        type: Number,
        required: true,
    },
    observacion:{
        type:String,
        required:false
    }
},{
    timestamps: true
  }
);

otroservicioSchema.plugin(Autoincrement.plugin,{
    model: 'otroservicio',
    field: 'otrosId',
    startAt: 1,
    incementBy: 1
});

module.exports=otroservicioSchema;