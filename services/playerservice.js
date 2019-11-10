var db = require ('../helper/db'); 
var playerModel = require ('../model/model'); 
var teamservice = require ('../teams/teamservice');


// función create player -------------------------------------------------------------------------------
async function create (playerparam){
    console.log("Creando jugador", playerparam, player, db);

    var player = new playerModel(playerparam);

    console.log("Se guardo el nuevo jugador");
    await player.save();
}

// función get all --------------------------------------------------------------------------------------
//async function getall (nombre, apellido){
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
    //let team = teamservice.getByIdTeam(playerDb.idteam);
    //let team = await teamservice.getByIdTeam(1);
    console.log('llego 2'); 

    var equipo_jugador = {
        equipo: "Riber",
        nombre: playerDb.nombre,
        apellido: playerDb.apellido,
        edad:     playerDb.edad,
        posicion: playerDb.posicion
    };
    //playerDb.teamnombre = 'teamnombre';
    console.log(equipo_jugador);
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