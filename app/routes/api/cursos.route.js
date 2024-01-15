const express = require('express');
const router = express.Router();

// Validates
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validateFields');

const cursosControllerController = require('../../controllers/api/cursosController');
router.get('/', cursosControllerController.index);
router.post('/', 
    
        [// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
check('id_personal', 'El id_personal es requerido').trim().escape().not().isEmpty(),
// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
check('id_estudiante', 'El id_estudiante es requerido').trim().escape().not().isEmpty(),
// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
check('id_curso', 'El id_curso es requerido').trim().escape().not().isEmpty(),
check('anio', 'El anio es requerido').trim().escape().not().isEmpty(),
check('estado', 'El estado es requerido').trim().escape().not().isEmpty(),
check('condicion', 'El condicion es requerido').trim().escape().not().isEmpty(),
check('fecha_registro', 'El fecha_registro es requerido').trim().escape().not().isEmpty(),
check('fecha_programacion', 'El fecha_programacion es requerido').trim().escape().not().isEmpty(),
check('comentario', 'El comentario es requerido').trim().escape().not().isEmpty(),
check('modalidad', 'El modalidad es requerido').trim().escape().not().isEmpty(),
check('encargado', 'El modalidad es requerido').trim().escape().not().isEmpty(),
check('modulos', 'El modalidad es requerido').trim().escape().not().isEmpty(),
check('precio_contado', 'El modalidad es requerido').trim().escape().not().isEmpty(),
check('precio_cuotas', 'El modalidad es requerido').trim().escape().not().isEmpty(),
], 
    
 cursosControllerController.create);
router.put('/:id',
    
        [// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
check('id_personal', 'El id_personal es requerido').trim().escape().not().isEmpty(),
// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
check('id_estudiante', 'El id_estudiante es requerido').trim().escape().not().isEmpty(),
// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
check('id_curso', 'El id_curso es requerido').trim().escape().not().isEmpty(),
check('anio', 'El anio es requerido').trim().escape().not().isEmpty(),
check('estado', 'El estado es requerido').trim().escape().not().isEmpty(),
check('condicion', 'El condicion es requerido').trim().escape().not().isEmpty(),
check('fecha_registro', 'El fecha_registro es requerido').trim().escape().not().isEmpty(),
check('fecha_programacion', 'El fecha_programacion es requerido').trim().escape().not().isEmpty(),
check('comentario', 'El comentario es requerido').trim().escape().not().isEmpty(),
check('modalidad', 'El modalidad es requerido').trim().escape().not().isEmpty(),
check('encargado', 'El modalidad es requerido').trim().escape().not().isEmpty(),
check('modulos', 'El modalidad es requerido').trim().escape().not().isEmpty(),
check('precio_contado', 'El modalidad es requerido').trim().escape().not().isEmpty(),
check('precio_cuotas', 'El modalidad es requerido').trim().escape().not().isEmpty(),
], 
    
cursosControllerController.update);
router.get('/:id', cursosControllerController.show);
router.delete('/:id', cursosControllerController.delete);

module.exports = router;
