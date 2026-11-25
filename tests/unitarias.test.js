const {
    calcularSubtotal,
    calcularDescuento
} = require('../src/ventas');

describe('Pruebas unitarias', () => {

    test('PU-01: Calcula subtotal de 100 x 2', () => {
        expect(calcularSubtotal(100, 2)).toBe(200);
    });

    test('PU-02: Calcula subtotal de 50 x 3', () => {
        expect(calcularSubtotal(50, 3)).toBe(150);
    });

    test('PU-03: Aplica descuento del 10%', () => {
        expect(calcularDescuento(500)).toBe(50);
    });

    test('PU-04: No aplica descuento', () => {
        expect(calcularDescuento(499)).toBe(0);
    });

    test('PU-05: Rechaza precios negativos', () => {
        expect(() => {
            calcularSubtotal(-100, 2);
        }).toThrow('Precio inválido');
    });

    test('PU-06: Rechaza cantidad igual a cero', () => {
        expect(() => {
            calcularSubtotal(100, 0);
        }).toThrow('Cantidad inválida');
    });

});