import { Router } from 'express'
import { check } from 'express-validator'
import { acceptRequest, getOwnUser, updateOwnUser, remove} from './user.controller.js'

import { validateJWT } from '../helpers/validate-jwt.js'

const router = Router();

router.get('/getOwnUser', validateJWT, getOwnUser);


//router.get('/getUsers', getUsers);

router.post('/post', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('DPI', 'El DPI es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('direction', 'La dirección es obligatoria').not().isEmpty(),
    check('phone', 'El teléfono es obligatorio').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('typeAccount', 'El tipo de cuenta es obligatorio').not().isEmpty(),
    //validateJWT
], acceptRequest);

router.put('/update', validateJWT, updateOwnUser);
router.delete('/remove', remove);

export default router;