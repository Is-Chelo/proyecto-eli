const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const promocionesController = require('../../controllers/api/promocionesController');

router.get('/', promocionesController.index);
router.post(
	'/',

	[
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
	],

	promocionesController.create
);
router.put(
	'/:id',

	[
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
	],

	promocionesController.update
);
router.get('/:id', promocionesController.show);
router.delete('/:id', promocionesController.delete);

module.exports = router;
