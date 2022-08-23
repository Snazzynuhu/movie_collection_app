import express from 'express'
const router = express.Router();
import {RegisterUser,LoginUser,LogoutUser,getUsers} from '../controller/userController'

router.post('/register',RegisterUser)
router.post('/login',LoginUser)
router.post('/logout',LogoutUser)
router.get('/allUsers',getUsers)


export default router
