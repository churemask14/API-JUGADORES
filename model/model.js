var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
    idteam: {type: Number, required: true, },
    nombre: { type: String , required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    posicion: {type: String, default: 'player'}
});

userSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('player', userSchema);