const { Router } = require('express');
const { compararHorarios, getHorario } = require('../controllers/horario.controller');

const router = Router();


router.get('/:programa/:semestre',getHorario);
router.get('/:programaA/:semestreA/:programaB/:semestreB',compararHorarios);



module.exports = router;

