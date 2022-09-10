"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const movieController_1 = require("../controller/movieController");
const userController_1 = require("../controller/userController");
router.get('/', movieController_1.getMovies);
router.get('/register', userController_1.registration);
router.get('/login', userController_1.login);
router.get('/dashboard', movieController_1.dashboard);
router.get('/update/:id', async (req, res, next) => {
    let record = await (0, movieController_1.getSingleMovie)(req, res, next);
    res.render("updateMovieForm", { record });
});
router.get('/newMovie', movieController_1.newMoviePage);
exports.default = router;
