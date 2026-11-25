function calcularSubtotal(precio, cantidad) {
    if (!Number.isFinite(precio) || precio < 0) {
        throw new Error('Precio inválido');
    }

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
        throw new Error('Cantidad inválida');
    }

    return precio * cantidad;
}

function calcularDescuento(subtotal) {
    if (subtotal >= 500) {
        return subtotal * 0.20;
    }

    return 0;
}

function calcularVenta(precio, cantidad) {
    const subtotal = calcularSubtotal(precio, cantidad);
    const descuento = calcularDescuento(subtotal);
    const total = subtotal - descuento;

    return {
        subtotal,
        descuento,
        total
    };
}

module.exports = {
    calcularSubtotal,
    calcularDescuento,
    calcularVenta
};