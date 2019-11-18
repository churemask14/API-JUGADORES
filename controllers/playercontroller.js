const express = require ('express');
var playerservice = require ('../services/playerservice');
var router = express.Router();


//Router get-----------------------------------------------------------------------------------
router.get ("/", (req,res,next) => {
    console.log(req.param);
    playerservice.getallandparams(req.query.nombre, req.query.apellido, req.query.edad, req.query.posicion).
    then ((p)=> {
        if (p){
            res.status (200).json(p);
        } else {
            return res.status(404).json({message: "jugador no encontrado"});
        }
    })
        
    .catch((err)=>{
        next(err);
    });
}) 

//Router getbyid-----------------------------------------------------------------------------------
router.get ("/:id", (req,res,next) => {
    console.log(req.param);
    playerservice.getById(req.params.id).
    then ((p)=> {
        if (p){
            res.status (200).json(p);
        } 
    }).catch((err)=> next(err)); 
    
}) 



//Router post----------------------------------------------------------------------------------------
router.post ("/", (req,res,next)=> {
    console.log ("inicio alta jugador");
    playerservice.create(req.body).
    then (()=>{
        return res.status(200).json ({message: "Se registro el jugador correctamente"});
    }).catch((err)=> next(err));
})

//Router delete------------------------------------------------------------------------------------------
//router.delete ("/", (req,res,next) => {
//    console.log(req.param);
//    playerservice.deleteplayer(req.query.nombre,req.query.apellido).
//    then ((p)=> res.status (200).json({message: "Se borró el jugador correctamente"}))
//    .catch((err)=>{
//        next(err);
//    });
//}) 

//Router delete------------------------------------------------------------------------------------------
router.delete ("/:id", (req,res,next) => {
    console.log(req.param);
    playerservice.deleteplayerbyid(req.params.id).
    then (()=> res.status (200).json({message: "Se borró el jugador correctamente"}))
    .catch((err)=>{
        next(err);
    });
}) 

//Router update------------------------------------------------------------------------------------------
router.patch ("/:id", async (req,res,next) => {
    console.log("user patch controller",req.param);
    playerservice.updateplayer(req.params.id, req.body)
    .then ((player)=> res.status (200).json(player))
    .catch((err)=>{
        console.log(err);
        next(err);
    });
}) 

module.exports = router;



/*
try{
    let p = await playerservice.updateplayer(req.params.id, req.body);
    res.status(200).json(p)
}catch(err){
    console.error(err);
    if (err.name ==="CastError"){
        res.status(400).json(err);
    }
    res.status(500).json(err);
}
}); */
