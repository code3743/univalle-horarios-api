const { response, request } = require('express');
const { chromium } = require("playwright-chromium");
const buscarPrograma = require('../utils/programas.util');
const ordenar = require('../utils/script');


const compararHorarios = async(req = request, res = response)=>{
    const {programaA, semestreA, programaB, semestreB} = req.params;
    try {
        const programaASelecionado = buscarPrograma(programaA);
        const programaBSelecionado = buscarPrograma(programaB);
        const semestreASelecionado = parseInt(semestreA);
        const semestreBSelecionado = parseInt(semestreB);

        const navegador = await chromium.launch({chromiumSandbox: false});
        const pagina = await navegador.newPage();
        await pagina.goto('https://recursostulua.univalle.edu.co/horarios/indexjoomla.php');
        await pagina.waitForLoadState();
        await pagina.evaluate(()=>{
            document.querySelector('.reset').click();
        });
        await pagina.waitForTimeout(500);

        const resultadoProgramaA = await pagina.evaluate(([programa, semestre]) => ordenar(programa, semestre), [programaASelecionado, semestreASelecionado] );
        const resultadoProgramaB = await pagina.evaluate(([programa, semestre]) => ordenar(programa, semestre), [programaBSelecionado, semestreBSelecionado] );


    } catch (error) {
        res.status(500).send(`Algo salio mal: ${error}`);
    }



}


const getHorario = async(req = request, res = response)=>{

    const { programa, semestre} = req.params;

    try {
        const programaSelecionado = buscarPrograma(programa);
        const semestreSelecionado = parseInt(semestre);
        const navegador = await chromium.launch({chromiumSandbox: false});
        const pagina = await navegador.newPage();
        await pagina.goto('https://recursostulua.univalle.edu.co/horarios/indexjoomla.php');
        await pagina.waitForLoadState();
        await pagina.evaluate(()=>{
            document.querySelector('.reset').click();
        });
        await pagina.waitForTimeout(500);
        const resultado = await pagina.evaluate(([programa, semestre]) => ordenar(programa, semestre), [programaSelecionado, semestreSelecionado] );

        await navegador.close();
        res.json({
            resultado
        });


    } catch (error) {
        res.status(500).send(`Algo salio mal: ${error}`);
    }



}


module.exports = {
    compararHorarios,
    getHorario
}