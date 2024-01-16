const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const personalController = require('../../controllers/api/personalController');

router.get('/', personalController.index);
router.post(
	'/',
	[
		check('ci', 'El ci es Requerido').trim().escape().not().isEmpty(),
		check('ci', 'El ci es Requerido').isNumeric(),
	],
	personalController.create
);
router.put(
	'/:id',
	[
		check('ci', 'El ci es Requerido').trim().escape().not().isEmpty(),
		check('ci', 'El ci es Requerido').isNumeric(),
	],
	personalController.update
);
router.get('/:id', personalController.show);
router.delete('/:id', personalController.delete);

module.exports = router;
