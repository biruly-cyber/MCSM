const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Subscription = require('../models/Subscription');

// Get all payments
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find().populate('company subscription');
        res.json(payments);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Create a new payment
router.post('/', async (req, res) => {
    const { company, subscription, amount, paymentStatus, paymentMethod } = req.body;
    try {
        let payment = new Payment({
            company,
            subscription,
            amount,
            paymentStatus,
            paymentMethod,
            paymentDate: Date.now()
        });
        await payment.save();

        let subscriptionDoc = await Subscription.findById(subscription);
        subscriptionDoc.paymentStatus = paymentStatus;
        await subscriptionDoc.save();

        res.json(payment);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('company subscription');
        if (!payment) return res.status(404).json({ msg: 'Payment not found' });
        res.json(payment);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update payment by ID
router.put('/:id', async (req, res) => {
    const { amount, paymentStatus, paymentMethod } = req.body;
    try {
        let payment = await Payment.findById(req.params.id);
        if (!payment) return res.status(404).json({ msg: 'Payment not found' });

        payment.amount = amount || payment.amount;
        payment.paymentStatus = paymentStatus || payment.paymentStatus;
        payment.paymentMethod = paymentMethod || payment.paymentMethod;
        payment.updatedAt = Date.now();

        await payment.save();
        res.json(payment);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete payment by ID
router.delete('/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) return res.status(404).json({ msg: 'Payment not found' });

        await payment.remove();
        res.json({ msg: 'Payment removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
