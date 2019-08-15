'use strict'

const express = require('express'),
    router = express.Router(),//permite crear la ruta
    Tarjeta = require('../models/tarjeta.model');

//Definir la ruta para registar contactos
//empizan con / por estandar
//- en el medio por standar
router.param('_id', function (req, res, next, _id) {
    req.body._id = _id;
    next();
});

router.param('nombre1', function (req, res, next, nombre1) {
    req.body.nombre1 = nombre1;
    next();
});

router.param('numTarjeta', function (req, res, next, numTarjeta) {
    req.body.numTarjeta = numTarjeta;
    next();
});

router.param('tipoTarjeta', function (req, res, next, tipoTarjeta) {
    req.body.tipoTarjeta = tipoTarjeta;
    next();
});

router.param('expiracionMM', function (req, res, next, expiracionMM) {
    req.body.expiracionMM = expiracionMM;
    next();
});

router.param('expiracionYY', function (req, res, next, expiracionYY) {
    req.body.expiracionYY = expiracionYY;
    next();
});

router.param('cvv', function (req, res, next, cvv) {
    req.body.cvv = cvv;
    next();
});

router.post('/registrarTarjeta', function (req, res) {
    /*req lo que recibo y response lo que respondo */
    let body = req.body;
    let nuevaTarjeta = new Tarjeta({
        // /Datos de Tarejeta/
        nombre1: body.nombre,
        numTarjeta: body.numero,
        tipoTarjeta: body.tipo,
        expiracionMM: body.mes,
        expiracionYY: body.year,
        cvv: body.cvv,
        usuario: body.usuario
    });
    Tarjeta.findOne({ numTarjeta: body.numero }).then(
        function (tarjeta) {
            if (tarjeta) {
                return res.status(400).json({
                    success: false,
                    message: 'La tarjeta no se pudo guardar ya esta en el sistema',
                    err
                });
            }
            else {
                nuevaTarjeta.save(
                    function (err, tarjetaDB) {
                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: 'La tarjeta no se pudo guardar',
                                err
                            });
                        } else {
                            return res.json({
                                success: true,
                                message: 'La tajeta se guardó con éxito'
                            })
                        }
                    }
                );
            }
        })

});


router.post('/modificarTarjeta', function (req, res) {
    let body = req.body;
   
    Tarjeta.findByIdAndUpdate(body._id, {
        $set: {
            nombre1: body.nombre1,
            numTarjeta: body.numTarjeta,
            tipoTarjeta: body.tipoTarjeta,
            expiracionMM: body.expiracionMM,
            expiracionYY: body.expiracionYY,
            cvv: body.cvv
        }
    },
        function (error) {

            if (error) {
                console.log("error");
                console.log(error);
                res.json({ success: false, msg: 'La tarjeta no se pudo actualizar' });
            } else {
                console.log("Tarjeta fue actualizada");
                res.json({ success: true, msg: 'Tarjeta fue actualizada' });
            }
        }
    )

});



router.get('/listarTarjetas', function (req, res) {
    Tarjeta.find(function (err, tarjetasDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las tarjetas',
                err
            });
        } else {
            return res.json({
                success: true,
                listaTarjetas: tarjetasDB
            })
        }
    });
});

router.get('/listarTarjetasPorId/:id', function (req, res) {
    Tarjeta.findById({usuario:req.params.id},function (err, tarjetasDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las tarjetas',
                err
            });
        } else {
            return res.json({
                success: true,
                listaTarjetas: tarjetasDB
            })
        }
    });
});


router.put('/editar/:id', function (req, res) {
    Tarjeta.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'La tarjeta no se pudo actualizar',
                err
            });
        }
        Tarjeta.findById(req.params.id, (err, tarjeta) => {
            return res.status(200).json({
                success: true,
                message: "Tarjeta fue actualizada",
                tarjeta: tarjeta
            })
        });
    });
});

router.delete('/eliminar/:id', function (req, res) {
    Tarjeta.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'La tarjeta no se pudo eliminar',
                err
            });
        }
        return res.status(200).json({
            success: true,
            message: "Tarjeta fue elimnada"
        });
    });
});



module.exports = router;
