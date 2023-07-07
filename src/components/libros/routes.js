const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', controller.get);
router.get('/:id', controller.getOne);
router.post('/', controller.crearLibro);
router.put('/:id', controller.actualizar_libro);
router.delete('/:id', controller.delete);

module.exports = router;
