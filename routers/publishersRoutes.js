const express = require('express');
const publisherController = require('../controllers/publisherController');

const router = express.Router();

router.get('/publishers', (req, res) => {
    const publishers = publisherController.getAllPublishers();
    res.json(publishers);
});

router.get('/domains', (req, res) => {
    const domains = publisherController.getAllDomains();
    res.json(domains);
});

router.post('/publishers', (req, res) => {
    const publisher = req.body;
    publisherController.addPublisher(publisher);
    res.send('Publisher added successfully');
});

router.post('/publishers/:publisher/domains', (req, res) => {
    let { publisher } = req.params;

    const newDomain = req.body;
    const success = publisherController.insertDomain(publisher, newDomain);

    if (success) {
        res.send('Domain inserted successfully');
    } else {
        res.status(404).send('Publisher not found');
    }
});

router.put('/publishers/:publisher/domains/:domain', (req, res) => {
    let { publisher, domain } = req.params;

    const updatedData = req.body;
    const success = publisherController.updateDomain(publisher, domain, updatedData);

    if (success) {
        res.send('Domain updated successfully');
    } else {
        res.status(404).send('Publisher or domain not found');
    }
});

router.delete('/publishers/:publisher/domains/:domain', (req, res) => {
    let { publisher, domain } = req.params;

    const success = publisherController.deleteDomain(publisher, domain);

    if (success) {
        res.send('Domain deleted successfully');
    } else {
        res.status(404).send('Publisher or domain not found');
    }
});

module.exports = router;
