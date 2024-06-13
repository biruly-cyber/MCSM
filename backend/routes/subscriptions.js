const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Company = require('../models/Company');

// Get all subscriptions
router.get('/', async (req, res) => {
    try {
        const subscriptions = await Subscription.find().populate('company');
        res.json(subscriptions);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Create a new subscription
router.post('/', async (req, res) => {
    const { company, plan, startDate, endDate, paymentStatus } = req.body;
    try {
        let subscription = new Subscription({ company, plan, startDate, endDate, paymentStatus });
        await subscription.save();

        let companyDoc = await Company.findById(company);
        companyDoc.subscription = subscription._id;
        await companyDoc.save();

        res.json(subscription);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get subscription by ID
router.get('/:id', async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id).populate('company');
        if (!subscription) return res.status(404).json({ msg: 'Subscription not found' });
        res.json(subscription);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update subscription by ID
router.put('/:id', async (req, res) => {
    const { plan, startDate, endDate, paymentStatus } = req.body;
    try {
        let subscription = await Subscription.findById(req.params.id);
        if (!subscription) return res.status(404).json({ msg: 'Subscription not found' });

        subscription.plan = plan || subscription.plan;
        subscription.startDate = startDate || subscription.startDate;
        subscription.endDate = endDate || subscription.endDate;
        subscription.paymentStatus = paymentStatus || subscription.paymentStatus;
        subscription.updatedAt = Date.now();

        await subscription.save();
        res.json(subscription);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete subscription by ID
router.delete('/:id', async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) return res.status(404).json({ msg: 'Subscription not found' });

        await subscription.remove();
        res.json({ msg: 'Subscription removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
