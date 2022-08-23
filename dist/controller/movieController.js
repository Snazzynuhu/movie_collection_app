"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMoviePage = exports.updatePage = exports.dashboard = exports.deleteMovie = exports.updateMovie = exports.getSingleMovie = exports.getMovies = exports.Movies = void 0;
const uuid_1 = require("uuid");
const movieModel_1 = require("../model/movieModel");
const userModel_1 = require("../model/userModel");
const utils_1 = require("../utils/utils");
async function Movies(req, res, next) {
    const id = (0, uuid_1.v4)();
    const verified = req.user;
    let movie = { id, ...req.body, userId: verified.id };
    try {
        const validationResult = utils_1.createMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await movieModel_1.MovieInstance.create(movie);
        res.redirect("/");
        // res.status(201).json({
        //   msg: "You have successfully created a movie",
        //   record,
        // });
    }
    catch (err) {
        res.status(500).json({
            msg: "failed to create",
            route: "/create",
        });
    }
}
exports.Movies = Movies;
async function getMovies(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await movieModel_1.MovieInstance.findAll({ limit, offset,
            include: [{
                    model: userModel_1.UserInstance,
                    attributes: ['id', 'fullname', 'username', 'email'],
                    as: 'user'
                }
            ]
        });
        res.render("index", { record });
        // res.status(200).json({
        //   msg: "You have successfully fetch all movies",
        //   // count: record.count,
        //   record: record
        // });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read",
        });
    }
}
exports.getMovies = getMovies;
async function getSingleMovie(req, res, next) {
    try {
        const { id } = req.params;
        const record = await movieModel_1.MovieInstance.findOne({ where: { id } });
        return record;
        // res.status(200).json({
        //   msg: "Successfully gotten movie data",
        //   record,
        // });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single todo",
            route: "/movies/:id",
        });
    }
}
exports.getSingleMovie = getSingleMovie;
async function updateMovie(req, res, next) {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const validationResult = utils_1.updateMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await movieModel_1.MovieInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find existing movie",
            });
        }
        const updatedrecord = await record.update({
            title: title,
            description: description,
        });
        res.redirect("/dashboard");
        // res.status(200).json({
        //   msg: "You have successfully updated a movie",
        //   updatedrecord,
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
        const record = await movieModel_1.MovieInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Cannot find movie",
            });
        }
        const deletedRecord = await record.destroy();
        return res.send(`<div style="text-align: center">
   <h1 style="color: red;">Movie deleted</h1>
   <a style="background-color:yellowgreen; color:#fff; border-radius:1rem; padding:1rem 3rem; text-decoration:none" href="http://localhost:3000/dashboard">Back to Dashboard</a>
   </div>`);
        // res.status(200).json({
        //   msg: "Movie deleted successfully",
        //   deletedRecord,
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
//this line today
async function dashboard(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //  const record = await MovieInstance.findAll({where: {},limit, offset})
        const record = await movieModel_1.MovieInstance.findAll({ limit, offset,
            include: [{
                    model: userModel_1.UserInstance,
                    attributes: ['id', 'fullname', 'username', 'email'],
                    as: 'user'
                }
            ]
        });
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
        const record = await movieModel_1.MovieInstance.findAll({ limit, offset,
            include: [{
                    model: userModel_1.UserInstance,
                    attributes: ['id', 'fullname', 'username', 'email'],
                    as: 'user'
                }
            ]
        });
        //res.render("updateMovieForm",{record})
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
        const record = await movieModel_1.MovieInstance.findAll({ limit, offset,
            include: [{
                    model: userModel_1.UserInstance,
                    attributes: ['id', 'fullname', 'username', 'email'],
                    as: 'user'
                }
            ]
        });
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
