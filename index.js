const express = require('express');
const path = require('path');
const client = require('prom-client');
const app = express();
const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'entry.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'about.html'));
});

app.get('/exit', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'exit.html'));
});

app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        const metrics = await register.metrics();
        res.send(metrics);
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).send('Failed to fetch metrics');
    }
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
