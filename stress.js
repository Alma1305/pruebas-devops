const autocannon = require('autocannon');

async function probarCarga(conexiones, fase) {

    console.log(
        `\n${fase}: ${conexiones} conexiones`
    );

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

        connections: conexiones,
        duration: 5
    });

    return {
        fase,
        conexiones,
        solicitudes: resultado.requests.total,
        solicitudesPorSegundo: resultado.requests.average,
        latenciaPromedio: resultado.latency.average,
        latenciaMaxima: resultado.latency.max,
        errores: resultado.errors,
        timeouts: resultado.timeouts,
        respuestasFallidas: resultado.non2xx
    };
}

async function ejecutarPruebas() {

    const cargas = [10, 50, 100, 200, 500];

    const resultados = [];

    for (const conexiones of cargas) {

        const resultado = await probarCarga(
            conexiones,
            'Carga'
        );

        resultados.push(resultado);
    }

    const recuperacion = await probarCarga(
        10,
        'Recuperación'
    );

    resultados.push(recuperacion);

    console.log('\nRESULTADOS FINALES');

    console.table(resultados);
}

ejecutarPruebas().catch(error => {
    console.error(error);
    process.exitCode = 1;
});