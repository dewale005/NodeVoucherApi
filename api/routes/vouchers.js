const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Voucher = require('../models/vouchers');

router.get('/', (req, res, next) => {
    Voucher.find()
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'No Entry found' })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.post('/', (req, res, next) => {
    const voucher = new Voucher({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        code: req.body.code
    });
    voucher.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /vouchers',
            createdVoucher: result
        });
    })
    .catch(err => console.log(err));
    res.status(500).json({
        error: err
    })
});

router.get('/:voucherId', (req, res, next) => {
    const id = req.params.voucherId;
    Voucher.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No Entry found' })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:voucherId', (req, res, next) => {
   const id = req.params.voucherId;
   const updateOps = {};
   for (const ops of req.body) {
       updateOps[ops.propName] = ops.value;
   }
    Voucher.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.delete('/:voucherId', (req, res, next) => {
    const id = req.params.voucherId;
    Voucher.remove({_id: id})
    .exec()
    .then(result => {
            res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
module.exports = router;