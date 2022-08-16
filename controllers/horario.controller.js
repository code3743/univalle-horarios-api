const { response, request } = require('express');
const { chromium } = require("playwright-chromium");
const buscarPrograma = require('../utils/programas.util');
const getHorarioSeleccion = require('../utils/script');


const compararHorarios = async(req = request, res = response)=>{
    const {programaA, semestreA, programaB, semestreB} = req.params;
    try {
        const programaASelecionado = buscarPrograma(programaA);
        const programaBSelecionado = buscarPrograma(programaB);
        const semestreASelecionado = parseInt(semestreA); 
        const semestreBSelecionado = parseInt(semestreB);

        const paramateroA = {
            programaSelecionado : programaASelecionado, 
            semestreSelecionado : semestreASelecionado
        }

        const paramateroB = {
            programaSelecionado : programaBSelecionado, 
            semestreSelecionado : semestreBSelecionado
        }

        const navegador = await chromium.launch({chromiumSandbox: false});
        const pagina = await navegador.newPage();
        await pagina.goto('https://recursostulua.univalle.edu.co/horarios/indexjoomla.php');
        await pagina.waitForLoadState();
        await pagina.evaluate(()=>{
            document.querySelector('.reset').click();
        });
        const resultadoProgramaA = await pagina.evaluate(getHorarioSeleccion, paramateroA );
        const resultadoProgramaB = await pagina.evaluate(getHorarioSeleccion, paramateroB );

        
        //TODO: Agregar logica del comparacion
        

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
       
        const resultado = await pagina.evaluate(getHorarioSeleccion, {programaSelecionado, semestreSelecionado});

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