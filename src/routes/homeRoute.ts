import express from 'express'
import {auth} from '../middleware/auth';

const router = express.Router();

import { getMovies,getSingleMovie,updateMovie,deleteMovie, dashboard, updatePage, newMoviePage} from '../controller/movieController'
import {registration, login} from '../controller/userController'


router.get('/', getMovies);
router.get('/register',registration);
router.get('/login',login);
router.get('/dashboard', dashboard);
router.get('/update/:id',async (req,res, next)=>{
   let record = await getSingleMovie(req, res, next)
   res.render("updateMovieForm", {record})
});
router.get('/newMovie',newMoviePage);


export default router
