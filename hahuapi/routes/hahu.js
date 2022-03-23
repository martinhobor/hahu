var express = require('express');
var router = express.Router();

var Hirdetes = require('../models/hirdetes')


router.post('/', function(req, res, next) {
    const _id= req.body._id
    const kategoria= req.body.kategoria
    const cim= req.body.cim
    const leiras= req.body.leiras
    const hirdetesDatuma= req.body.hirdetesDatuma
    const serulesmentes= req.body.serulesmentes
    const arFt= req.body.arFt
    const kepUrl= req.body.kepUrl

    const hirdetes = new Hirdetes({_id, kategoria, cim, leiras, hirdetesDatuma,serulesmentes,arFt,kepUrl})
    hirdetes
        .save()
        .then(res.json({
            "message":"A rekord rögzítése sikeres"
        }))
        .catch(err => console.log(err))
});

module.exports = router;
