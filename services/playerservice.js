var db = require ('../helper/db'); 
var playerModel = require ('../model/model'); 
var teamservice = require ('../teams/teamservice');


// función create player -------------------------------------------------------------------------------
async function create (playerparam){
    console.log("Creando jugador", playerparam, player, db);

    if (typeof (playerparam.edad) != 'number'){
        throw 'La edad es campo obligatorio y tiene que ser valor numérico'
    }

    if (typeof (playerparam.idteam) != 'number'){
        throw 'El idteam es campo obligatorio y tiene que ser valor numérico'
    }
    
    if (typeof (playerparam.nombre) != 'string'){
        throw 'El nombre es campo obligatorio y tiene que ser un string'
    }

    if (typeof (playerparam.apellido) != 'string'){
        throw 'El apellido es campo obligatorio y tiene que ser un string'
    }



    var player = new playerModel(playerparam);

    console.log(player.idteam)

    playerModel.count({ idteam: player.idteam }, function (err, count) {
        console.log('there are %d jungle adventures', count);
        if (count > 5)
            throw 'diedmxlskdj'

      });
    
    
    console.log("quiero contar")

    
    console.log("Se guardo el nuevo jugador");
    //console.log(cantidad)
    await player.save();
}

// función get by nombre y apellido --------------------------------------------------------------------------------------
//async function getbynombreyapellido(nombre, apellido){
//    let query = {};
//    if(nombre)
//        query.nombre = nombre;

//    if(apellido){
//        query.apellido = apellido;
//    }
//    console.log("buscando", query, nombre, apellido)
//    return await playerModel.find(query)
//}

// función get all y parametros --------------------------------------------------------------------------------------
async function getallandparams (nombre, apellido, edad, posicion){
    let query = {};

    if (nombre){
        query.nombre = nombre;
    }

    if (apellido){
        query.apellido = apellido;
    }

    if (edad){
        query.edad = edad;
    }

    if (posicion){
        query.posicion = posicion;
    }

    console.log("buscandoooooo", query, nombre, apellido, edad, posicion)
    return await playerModel.find(query)
}


// función get by id con api baltazar ---------------------------------------------------------------------------------
async function getById (id){
    console.log('llego1'); 
    let playerDb =  await playerModel.findById(id);
    console.log('llego3');
    if (!playerDb) throw 'Jugador no encontrado';

    console.log(id);

    //let team = await teamservice.getByIdTeam(playerDb.idteam);
    //let team = await teamservice.getByIdTeam(15);
    
    //console.log(team[0]);
    
    var equipo_jugador = {
        //equipo: team[0].nombre,
        id:       playerDb._id,      
        nombre:   playerDb.nombre,
        apellido: playerDb.apellido,
        edad:     playerDb.edad,
        posicion: playerDb.posicion
    };
    //playerDb.teamnombre = 'teamnombre';
    return equipo_jugador;

}



// funcion delete by nombre y apellido----------------------------------------------------------------------
//async function deleteplayer(nombre, apellido){
//    let query = {};
//    if(nombre)
//        query.nombre = nombre;
//
//    if(apellido){
//       query.apellido = apellido;
//    }
//    console.log("borrando", query, nombre, apellido)
//    return await playerModel.deleteOne(query)
//}

// funcion delete by id----------------------------------------------------------------------
async function deleteplayerbyid(_id){
    console.log("borrando", _id)
    if (!_id)
        throw 'El id ingresado no existe'
    return await playerModel.findByIdAndDelete({_id}, function (err){})
}

// funcion updatebyid------------------------------------------------------------------------------------------
async function updateplayer(_id, user){
    let player =  { nombre: user.nombre, apellido: user.apellido, edad: user.edad, posicion:user.posicion};
    console.log("for update", player);
    /*
    if (typeof (user.edad) != 'number'){
        throw 'La edad es campo obligatorio y tiene que ser valor numérico'
    }

    if (typeof (user.idteam) != 'number'){
        throw 'El idteam es campo obligatorio y tiene que ser valor numérico'
    }
    
    if (typeof (user.nombre) != 'string'){
        throw 'El nombre es campo obligatorio y tiene que ser un string'
    }

    if (typeof (user.apellido) != 'string'){
        throw 'El apellido es campo obligatorio y tiene que ser un string'
    }

    if (!_id)
        throw 'Se necesita un id existente para actualizar'
    */


    console.log (typeof (player.edad));
    let playerUpdated = await playerModel.findOneAndUpdate({ _id }, player, {new:true, runValidators: true });

    console.log("updated", playerUpdated);
    return playerUpdated;
}


module.exports= {
    create,
    getallandparams,
    getById,
//    deleteplayer,
    updateplayer,
    deleteplayerbyid
}