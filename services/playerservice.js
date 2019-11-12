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

    console.log("Se guardo el nuevo jugador");
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

// función get all --------------------------------------------------------------------------------------
async function getall (_id){
    let query = {};
    if (_id)
        {
            query._id = _id;
        }
    console.log("buscando", query, _id)
    return await playerModel.find(query)
}


// función get by id con api baltazar ---------------------------------------------------------------------------------
async function getById (id){
    console.log('llego1'); 
    let playerDb =  await playerModel.findById(id);
    console.log('llego3');
    if (!playerDb) throw 'Jugador no encontrado';
    //let team = teamservice.getByIdTeam(playerDb.idteam);
    //let team = await teamservice.getByIdTeam(5);
    
    console.log('llego 2'); 
    
    var equipo_jugador = {
        equipo: 'team[0].nombre',        
        nombre: playerDb.nombre,
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
    let query = {};
    if(_id)
        query._id = _id;

    console.log("borrando", query, _id)
    return await playerModel.deleteOne(query)
}

// funcion updatebyid------------------------------------------------------------------------------------------
async function updateplayer(_id, user){
    let player =  { nombre: user.nombre, apellido: user.apellido, edad: user.edad, posicion:user.posicion};
    console.log("for update", player);

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

    console.log (typeof (player.edad));
    let playerUpdated = await playerModel.findOneAndUpdate({ _id }, player, {new:true, runValidators: true });

    console.log("updated", playerUpdated);
    return playerUpdated;
}


module.exports= {
    create,
    getall,
    getById,
//    deleteplayer,
    updateplayer,
    deleteplayerbyid
}