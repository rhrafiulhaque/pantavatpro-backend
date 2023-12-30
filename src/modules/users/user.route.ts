import express from 'express'
import { ENUM_USER_ROLE } from '../../app/enums/user'
import auth from '../../app/middleware/auth'
import { UserController } from './user.controller'

const router = express.Router()
router.post('/create-user', UserController.createUser)

router.get('/allusers', auth(ENUM_USER_ROLE.USER), UserController.getAllUsers)

export const UserRoutes = router
