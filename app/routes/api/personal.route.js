const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const personalController = require('../../controllers/api/personalController');

router.get('/', personalController.index);
router.post('/', personalController.create);
router.put( '/:id', personalController.update );
router.get('/:id', personalController.show);
router.delete('/:id', personalController.delete);

module.exports = router;
