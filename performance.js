const autocannon = require('autocannon');

async function ejecutarPrueba() {

    console.log('Iniciando prueba de rendimiento...');

    const resultado = await autocannon({
        url: 'http://localhost:3000/ventas',
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            precio: 100,
            cantidad: 5
        }),

        connections: 10,
        duration: 10
    });

    console.table({
        'Conexiones concurrentes': 10,
        'Duración (segundos)': resultado.duration,
        'Solicitudes totales': resultado.requests.total,
        'Solicitudes por segundo': resultado.requests.average,
        'Latencia promedio (ms)': resultado.latency.average,
        'Latencia máxima (ms)': resultado.latency.max,
        'Errores': resultado.errors,
        'Timeouts': resultado.timeouts,
        'Respuestas no 2xx': resultado.non2xx
    });

    const aprobado =
        resultado.requests.total > 0 &&
        resultado.latency.average < 500 &&
        resultado.errors === 0 &&
        resultado.timeouts === 0 &&
        resultado.non2xx === 0;

    if (aprobado) {
        console.log('PRUEBA DE RENDIMIENTO APROBADA');
    } else {
        console.log('PRUEBA DE RENDIMIENTO NO APROBADA');
        process.exitCode = 1;
    }
}

ejecutarPrueba().catch(error => {
    console.error(error);
    process.exitCode = 1;
});