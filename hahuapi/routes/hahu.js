const { response } = require('express');
var express = require('express');
var router = express.Router();

var Hirdetes = require('../models/hirdetes')
const Kategoria = require('../models/kategoria')


router.post('/', function(req, res, next) {
    const _id= req.body._id
    const kategoria= req.body.kategoria
    const cim= req.body.cim
    const leiras= req.body.leiras
    const hirdetesDatuma= req.body.hirdetesDatuma
    const serulesmentes= req.body.serulesmentes
    const arFt= req.body.arFt
    const kepUrl= req.body.kepUrl

    try {
        if (arFt % 1000 != 0) {
            throw Error("Az ár nem osztható 1000-rel!")
        }
        else{
            const hirdetes = new Hirdetes({_id, kategoria, cim, leiras, hirdetesDatuma,serulesmentes,arFt,kepUrl})
            hirdetes
                .save()
                .then(res.status(200).json({
                    "message":"A rekord rögzítése sikeres"
        }))
        .catch(err => console.log(err))
        }
    } catch (error) {
        res.status(400).json({
            'error':error.message
        })
    }

    
});

router.get("/:mezo", function(req, res, next){
    const mezo = req.params.mezo
    Hirdetes.find()
    .populate("kategoria","nev -_id")
    .sort({[mezo]:1})
    .then(response =>{
        res.json(response)
    })
    .catch(err => console.log(err))
})

router.get("/", function(req, res, next){
    Hirdetes
    .find()
    .then(hirdetesek => {
        res.json(hirdetesek)
    })
    .catch(err => console.log(err))
})

router.delete("/:id", function(req, res, next){
    const id = req.params.id

    Hirdetes
    .findById(id)
    .then(response =>{
        if (response === null) {
            return res.json({'error': `A hirdetes ${id} azonosítoval nem létezik`})
        }
    })

    Hirdetes
    .findByIdAndDelete(id)
    .then(res.json({
        'status':'deleted'
    }))
    .catch(err => console.log(err))
})

module.exports = router;
