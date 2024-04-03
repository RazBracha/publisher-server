const fs = require('fs');
const path = require('path');

const dataFilePath = path.resolve('./DB', 'data.json');

function getData() {
    const rawData = fs.readFileSync(dataFilePath);
    return JSON.parse(rawData);
}

function setData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

function getAllPublishers() {
    return getData();
}

function getAllDomains() {
    const data = getData();
    let domains = [];
    data.forEach(publisher => {
        domains = domains.concat(publisher.domains);
    });
    return domains;
}

function addPublisher(newPublisher) {
    const publishers = getData();
    publishers.push(newPublisher);
    setData(publishers);
}

function addDomain(publisherId, newDomain) {
    const data = getData();
    const publisherIndex = data.findIndex(p => p.id === publisherId);
    if (publisherIndex != -1) {
        data[publisherIndex].domains.push(newDomain);
        setData(data);
        return true;
    }
    return false; // Publisher not found
}

function updateDomain(publisherId, domainId, updatedData) {
    const data = getData();
    const publisherIndex = data.findIndex(p => p.id === publisherId);
    if (publisherIndex != -1) {
        const domainIndex = data[publisherIndex].findIndex(d => d.id === domainId);
        if (domainIndex != -1) {
            data[publisherIndex].domains[domainIndex] = { ...data[publisherIndex].domains[domainIndex], ...updatedData };
            setData(data);
            return true;
        }
    }
    return false; // Publisher or domain not found
}

function deleteDomain(publisherId, domainId) {
    const data = getData();
    const publisherIndex = data.findIndex(p => p.id === publisherId);
    if (publisherIndex !== -1) {
        const domainIndex = data[publisherIndex].domains.findIndex(d => d.id === domainId);
        if (domainIndex !== -1) {
            data[publisherIndex].domains.splice(domainIndex, 1);
            setData(data);
            return true;
        }
    }
    return false; // Publisher or domain not found
}

module.exports = {
    getAllPublishers,
    getAllDomains,
    addPublisher,
    insertDomain: addDomain,
    updateDomain,
    deleteDomain,
};