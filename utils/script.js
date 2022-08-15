
const ordenSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes ",
    "Sábado",
];

const getTodosLosHorarios = () => {
    const oferta = $$('#demo>tbody>tr[validrow="true"]');
    const dia = new Array(oferta.length);
    const detalleDia = new Array(14);
    const info = new Array(oferta.length);

    oferta.forEach((detalle, index) => {
        detalle.querySelectorAll("td").forEach((e, i) => {
            detalleDia[i] = e.innerText;
        });
        dia[index] = [...detalleDia];
    });

    dia.forEach((diaMateria, i) => {
        const [
            plan,
            ,
            semestre,
            codigo,
            materia,
            docente,
            grupo,
            diaNombre,
            sede,
            ,
            jornada,
            entrada,
            salida,
            creditos,
        ] = diaMateria;

        info[i] = {
            plan,
            semestre,
            codigo,
            materia,
            docente,
            grupo,
            diaNombre,
            sede,
            jornada,
            entrada,
            salida,
            creditos,
        };
    });
    return info;
}

const ordenar = (programa, semestre) => {
    const arregloTemp = []
    getTodosLosHorarios().forEach((materia) => {
        if (materia.plan == programa && materia.semestre == semestre) {
            arregloTemp.push(materia)
        }
    });
    const nuevoOrden = new Array(arregloTemp.length);
    let auxiliar = 0;
    for (let i = 0; i < ordenSemana.length; i++) {
        arregloTemp.forEach((e) => {
            if (e.diaNombre == ordenSemana[i]) {
                nuevoOrden[auxiliar] = e;
                auxiliar++;
            }
        });
    }
    return nuevoOrden;
}

module.exports = ordenar;


