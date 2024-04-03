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
    res.status(200).json({ message: 'Publisher added successfully' });
});


router.post('/publishers/:publisher/domains', async (req, res) => {
    const { publisher } = req.params;
    const newDomain = req.body;

    // Check if domain name already exists
    const domainExists = await publisherController.domainExists(newDomain.domain);
    if (domainExists) {
        res.status(400).send('Domain name already exists');
        return;
    }

    const success = publisherController.insertDomain(publisher, newDomain);

    if (success) {
        res.status(200).json({ message: 'Domain added successfully' });
    } else {
        res.status(404).send('Publisher not found');
    }
});

router.put('/publishers/:publisher/domains/:domain', async (req, res) => {
    const { publisher, domain } = req.params;
    const updatedData = req.body;

    // Check if domain name already exists
    const domainExists = await publisherController.domainExists(updatedData.domain);
    if (domainExists) {
        res.status(400).send('Domain name already exists');
        return;
    }

    const success = publisherController.updateDomain(publisher, domain, updatedData);

    if (success) {
        res.status(200).json({ message: 'Domain updated successfully' });
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
