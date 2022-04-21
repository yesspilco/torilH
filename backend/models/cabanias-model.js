const mongoose= require('mongoose');
const Schema= mongoose.Schema;
var SchemaTypes=mongoose.Schema.Types;

const Autoincrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/El-Toril");

Autoincrement.initialize(connection);


mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true)

const cabaniaSchema= new Schema({
    tipo:{
        type: SchemaTypes.ObjectId,
        required: true
    },
    servicio:{
        type: SchemaTypes.ObjectId, 
        required: true,
        sparse: true
    },    
    
    
},{
    timestamps: true
  }
);

cabaniaSchema.plugin(Autoincrement.plugin,{
    model: 'cabanias',
    field: 'cabaniaId',
    startAt: 1,
    incementBy: 1
});

module.exports=cabaniaSchema;

