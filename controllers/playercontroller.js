const express = require ('express');
var playerservice = require ('../services/playerservice');
var router = express.Router();

//Router get-----------------------------------------------------------------------------------
//router.get ("/", (req,res,next) => {
//    console.log(req.param);
//    playerservice.getall(req.query.nombre,req.query.apellido).
//    then ((p)=> {
//        if (p){
//            res.status (200).json(p);
//        }
//        if (!p) {
//            return res.status(404).json({message: "jugador no encontrado"});
//        }
//    })
        
//    .catch((err)=>{
//        next(err);
//    });
//}) 


//Router get-----------------------------------------------------------------------------------
router.get ("/", (req,res,next) => {
    console.log(req.param);
    playerservice.getall(req.query._id).
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
    p;layerservice.getById(req.params.id).
    then ((p)=> {
        if (p){
            res.status (200).json(p);
        } else {
            return res.status(404).json({message: "jugador no encontrado"});
        }
    }).catch(err=>res.status(409).json("error al buscar el team"));
        
    
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
router.delete ("/", (req,res,next) => {
    console.log(req.param);
    playerservice.deleteplayerbyid(req.query._id).
    then ((p)=> res.status (200).json({message: "Se borró el jugador correctamente"}))
    .catch((err)=>{
        next(err);
    });
}) 

//Router update------------------------------------------------------------------------------------------
router.patch ("/:id", async (req,res,next) => {
    console.log("user patch controller",req.param);
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
}); 

module.exports = router;






