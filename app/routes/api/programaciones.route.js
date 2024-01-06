const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const programacionesControllerController = require('../../controllers/api/programacionesController');
router.get('/', programacionesControllerController.index);
router.post(
	'/',
	[check('id_registro', 'El id_registro es requerido').trim().escape().not().isEmpty()],

	programacionesControllerController.create
);
router.put(
	'/:id',
	[check('id_registro', 'El id_registro es requerido').trim().escape().not().isEmpty()],
	programacionesControllerController.update
);
router.get('/:id', programacionesControllerController.show);
router.delete('/:id', programacionesControllerController.delete);

// router.get("/curso/:id", programacionesControllerController.getProgramacionbyCursos);

module.exports = router;
