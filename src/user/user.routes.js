import { Router } from 'express'
import { validate } from '../middlewares/validate-field.js'
import { createUserSchema } from '../middlewares/user.validators.js'
import { getOwnUser, updateOwnUser, remove, post, get} from './user.controller.js'

import { validateJWT } from '../helpers/validate-jwt.js'

const router = Router();

router.get('/getUsers', get);
router.get('/getOwnUser', validateJWT, getOwnUser);

router.post('/post', [ 
    validate(createUserSchema)
], post);

router.put('/update', validateJWT, updateOwnUser);
router.delete('/remove', remove);

export default router;