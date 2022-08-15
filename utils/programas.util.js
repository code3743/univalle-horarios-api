const programas = [
        {
            codigo: "2710",
            nombre: "Tec. En Electrónica"
        },
        {
            codigo: "2711",
            nombre: "Tec. En Sistemas de Información"
        },
        {
            codigo: "2712",
            nombre: "Tec. En Alimentos"
        },
        {
            codigo: "2724",
            nombre: "Tec. en Desarrollo de software"
        },
        {
            codigo: "3249",
            nombre: "Trabajo Social"
        },
        {
            codigo: "3554",
            nombre: "Construcción"
        },
        {
            codigo: "3743",
            nombre: "Ingeniería de Sistemas"
        },
        {
            codigo: "3753",
            nombre: "Ingeniería de Alimentos"
        },
        {
            codigo: "3841",
            nombre: "Contaduría Pública"
        },
        {
            codigo: "3845",
            nombre: "Administración de Empresas"
        }
]


const buscarPrograma = (parametro)=>{

    for (let i = 0; i < programas.length; i++) {
        if(programas[i].codigo == parametro){
            return  `${programas[i].codigo}-${programas[i].nombre}` 
        } 
    }

    throw 'no se encontro el programa'
}


module.exports = buscarPrograma;