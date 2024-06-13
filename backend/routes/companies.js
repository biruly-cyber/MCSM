const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// Get all companies
router.get('/', async (req, res) => {
    try {
        const companies = await Company.find().populate('users subscription');
        res.json(companies);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Create a new company
router.post('/', async (req, res) => {
    const { name, contactInfo } = req.body;
    try {
        let company = new Company({ name, contactInfo });
        await company.save();
        res.json(company);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get company by ID
router.get('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).populate('users subscription');
        if (!company) return res.status(404).json({ msg: 'Company not found' });
        res.json(company);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update company by ID
router.put('/:id', async (req, res) => {
    const { name, contactInfo } = req.body;
    try {
        let company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ msg: 'Company not found' });

        company.name = name || company.name;
        company.contactInfo = contactInfo || company.contactInfo;
        company.updatedAt = Date.now();

        await company.save();
        res.json(company);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete company by ID
router.delete('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ msg: 'Company not found' });

        await company.remove();
        res.json({ msg: 'Company removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
