var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var pos_valores = ["arquero", "defensor", "mediocampista", "delantero"];

var userSchema = new Schema({
    idteam: {type: Number, required: true, },
    nombre: { type: String , required: true, minlength:[3,"muy corto mínimo 3 letras"], maxlength:[15,"muy largo máximo 15 letras"] },
    apellido: { type: String, required: true, minlength:[3,"muy corto mínimo 3 letras"], maxlength:[15,"muy largo máximo 15 letras"] },
    edad: { type: Number, required: true, min:[14, "No puede ser menor que 14"], max:[60,"No puede ser mayor que 60"] },
    posicion: {type: String, required: true,enum:{values: pos_valores, message:"Dato incorrecto, posiciones posiles: arquero, defensor, mediocampista, delantero"}}
});

userSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('player', userSchema);