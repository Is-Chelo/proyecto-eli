const express = require('express');
const router = express.Router();

const cobranza_carrerasController = require('../../controllers/api/cobranza_carrerasController');

router.get('/', cobranza_carrerasController.index);
router.post('/', cobranza_carrerasController.create);
router.put('/:id', cobranza_carrerasController.update);
router.get('/:id', cobranza_carrerasController.show);
router.delete('/:id', cobranza_carrerasController.delete);

module.exports = router;
