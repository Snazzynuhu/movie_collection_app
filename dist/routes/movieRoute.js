"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const movieController_1 = require("../controller/movieController");
router.post('/create', movieController_1.createMovie);
router.get('/', movieController_1.getMovies);
router.get('/:id', movieController_1.getSingleMovie);
router.patch('/:id', auth_1.auth, movieController_1.updateMovie);
router.post('/:id', movieController_1.updateMovie);
router.delete('/:id', auth_1.auth, movieController_1.deleteMovie);
router.post('/del/:id', movieController_1.deleteMovie);
exports.default = router;
