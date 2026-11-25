const request = require('supertest');
const app = require('../src/app');

describe('Pruebas de aceptación', () => {

    test('PA-01: RF-01 Descuento en compra de $500', async () => {

        const respuesta = await request(app)
            .post('/ventas')
            .send({
                precio: 100,
                cantidad: 5
            });

        expect(respuesta.status).toBe(200);
        expect(respuesta.body.descuento).toBe(50);
        expect(respuesta.body.total).toBe(450);
    });

    test('PA-02: RF-02 Compra menor a $500', async () => {

        const respuesta = await request(app)
            .post('/ventas')
            .send({
                precio: 499,
                cantidad: 1
            });

        expect(respuesta.status).toBe(200);
        expect(respuesta.body.descuento).toBe(0);
        expect(respuesta.body.total).toBe(499);
    });

    test('PA-03: RF-03 Rechazar cantidad inválida', async () => {

        const respuesta = await request(app)
            .post('/ventas')
            .send({
                precio: 100,
                cantidad: 0
            });

        expect(respuesta.status).toBe(400);

        expect(respuesta.body.error)
            .toBe('Cantidad inválida');
    });

});