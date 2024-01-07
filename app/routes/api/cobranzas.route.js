const express = require('express');
const router = express.Router();

const cobranzaController = require('../../controllers/api/cobranzaController');

router.get('/', cobranzaController.index);
router.post('/', cobranzaController.create);
router.put('/:id', cobranzaController.update);
router.get('/:id', cobranzaController.show);
router.delete('/:id', cobranzaController.delete);

module.exports = router;
