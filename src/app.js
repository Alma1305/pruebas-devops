const express = require('express');
const { calcularVenta } = require('./ventas');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de ventas funcionando'
    });
});

app.post('/ventas', (req, res) => {
    try {
        const { precio, cantidad } = req.body;

        const venta = calcularVenta(precio, cantidad);

        res.status(200).json(venta);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

module.exports = app;