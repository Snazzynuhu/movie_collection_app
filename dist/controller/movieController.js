"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMoviePage = exports.updatePage = exports.dashboard = exports.deleteMovie = exports.updateMovie = exports.getSingleMovie = exports.getMovies = exports.createMovie = void 0;
const movieModel_1 = require("../model/movieModel");
const utils_1 = require("../utils/utils");
async function createMovie(req, res, next) {
    try {
        const { title, description, genre, imgUrl, rating, year } = req.body;
        const validationResult = utils_1.createMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const newMovie = new movieModel_1.MovieInstance(req.body);
        // const movie = newMovie.save().then((record) => res.status(201).json(record));
        const movie = newMovie.save().then((record) => res.redirect("/"));
    }
    catch (err) {
        res.status(500).json({
            msg: "failed to create",
            route: "/create",
        });
    }
}
exports.createMovie = createMovie;
async function getMovies(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await movieModel_1.MovieInstance.find();
        res.render("index", { record });
        // res.status(200).json({
        //   msg: "You have successfully fetch all movies",
        //   record: record
        // });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to fetch all movies",
            route: "/read",
        });
    }
}
exports.getMovies = getMovies;
async function getSingleMovie(req, res, next) {
    try {
        const { id } = req.params;
        const record = await movieModel_1.MovieInstance.findById(id);
        return record;
        // res.status(200).json({
        //   msg: "Successfully gotten movie data",
        //   record,
        // });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to fetch single movie",
            route: "/movies/:id",
        });
    }
}
exports.getSingleMovie = getSingleMovie;
async function updateMovie(req, res, next) {
    try {
        const { id } = req.params;
        const { title, description, imgUrl, genre, rating, year } = req.body;
        const validationResult = utils_1.updateMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await movieModel_1.MovieInstance.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find existing movie",
            });
        }
        res.redirect("/dashboard");
        // res.status(200).json({
        //   msg: "You have successfully updated a movie",
        //   record
        // });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/update/:id",
        });
    }
}
exports.updateMovie = updateMovie;
async function deleteMovie(req, res, next) {
    try {
        const { id } = req.params;
        const record = await movieModel_1.MovieInstance.findByIdAndDelete(id);
        if (!record) {
            return res.status(404).json({
                msg: "Movie not deleted",
            });
        }
        return res.send(`<div style="text-align: center">
   <h1 style="color: red;">Movie deleted</h1>
   <a style="background-color:yellowgreen; color:#fff; border-radius:1rem; padding:1rem 3rem; text-decoration:none" href="http://localhost:3000/dashboard">Back to Dashboard</a>
   </div>`);
        // res.status(200).json({
        //   msg: "Movie deleted successfully",
        //   record
        // });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id",
        });
    }
}
exports.deleteMovie = deleteMovie;
async function dashboard(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await movieModel_1.MovieInstance.find();
        res.render("dashboard", { record });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read",
        });
    }
}
exports.dashboard = dashboard;
async function updatePage(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //  const record = await MovieInstance.findAll({where: {},limit, offset})
        //   const record = await MovieInstance.find({ limit, offset,
        //     include:[{
        //        model:UserInstance,
        //        attributes:['id', 'fullname',  'username', 'email'],
        //        as:'user'
        //       }
        //       ]
        //  });
        const record = await movieModel_1.MovieInstance.find();
        //  res.render("updateMovieForm",{record})
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read",
        });
    }
}
exports.updatePage = updatePage;
async function newMoviePage(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //  const record = await MovieInstance.findAll({where: {},limit, offset})
        //   const record = await MovieInstance.find({ limit, offset,
        //     include:[{
        //        model:UserInstance,
        //        attributes:['id', 'fullname',  'username', 'email'],
        //        as:'user'
        //       }
        //       ]
        //  });
        const record = await movieModel_1.MovieInstance.find();
        res.render("addNewMovie");
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "failed to read",
            route: "/read",
        });
    }
}
exports.newMoviePage = newMoviePage;
