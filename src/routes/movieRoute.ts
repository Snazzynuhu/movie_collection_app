import express from 'express'
import {auth} from '../middleware/auth'

const router = express.Router();

import {Movies, getMovies,getSingleMovie,updateMovie,deleteMovie} from '../controller/movieController'

router.post('/create',auth, Movies);
router.get('/',getMovies)
router.get('/:id',getSingleMovie)

router.patch('/:id',auth,updateMovie)
router.post('/:id',updateMovie)
router.delete('/:id',auth,deleteMovie) 
router.post('/del/:id',deleteMovie)

export default router
