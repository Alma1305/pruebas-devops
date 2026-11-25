const request = require('supertest');
const app = require('../src/app');

describe('Pruebas de integración', () => {

    test('PI-01: La API responde correctamente', async () => {

        const respuesta = await request(app)
            .get('/');

        expect(respuesta.status).toBe(200);

        expect(respuesta.body.mensaje)
            .toBe('API de ventas funcionando');
    });

    test('PI-02: Integra subtotal y descuento', async () => {

        const respuesta = await request(app)
            .post('/ventas')
            .send({
                precio: 100,
                cantidad: 5
            });

        expect(respuesta.status).toBe(200);

        expect(respuesta.body).toEqual({
            subtotal: 500,
            descuento: 50,
            total: 450
        });
    });

    test('PI-03: Integra validación de datos', async () => {

        const respuesta = await request(app)
            .post('/ventas')
            .send({
                precio: -100,
                cantidad: 2
            });

        expect(respuesta.status).toBe(400);

        expect(respuesta.body.error)
            .toBe('Precio inválido');
    });

});