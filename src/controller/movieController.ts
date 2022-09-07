import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import  MovieInstance  from "../model/movieModel";
import { UserInstance } from "../model/userModel";
import { createMovieSchema, options, updateMovieSchema } from "../utils/utils";
import {any} from "joi"

// const Movie = require('./models/movieTemplate');
export async function Movies(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  const verified = req.user;
  let movie = { id ,...req.body, userId: verified.id };
  try {
    const validationResult = createMovieSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    
    const record = await MovieInstance.create(movie
      );
    res.redirect("/")
    // res.status(201).json({
    //   msg: "You have successfully created a movie",
    //   record,
    // });
  } catch (err) {
    res.status(500).json({
      msg: "failed to create",
      route: "/create",
    });
  }
}

export async function getMovies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    const record = await MovieInstance.find({ limit, offset,
      include:[{
         model:UserInstance,
         attributes:['id', 'fullname',  'username', 'email'],
         as:'user'
        }
        ]
   });
   res.render("index",{record})
    // res.status(200).json({
    //   msg: "You have successfully fetch all movies",
    //   // count: record.count,
    //   record: record
    // });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}

export async function getSingleMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await MovieInstance.findOne({ where: { id } });
    return record;
    // res.status(200).json({
    //   msg: "Successfully gotten movie data",
    //   record,
    // });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single todo",
      route: "/movies/:id",
    });
  }
}

export async function updateMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const validationResult = updateMovieSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const record = await MovieInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        Error: "Cannot find existing movie",
      });
    }
    const updatedrecord = await record.update({
      title: title,
      description: description,
    })
    res.redirect("/dashboard");
    // res.status(200).json({
    //   msg: "You have successfully updated a movie",
    //   updatedrecord,
    // });
  } catch (error) {
    res.status(500).json({
      msg: "failed to update",
      route: "/update/:id",
    });
  }
}

export async function deleteMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await MovieInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        msg: "Cannot find movie",
      });
    }
    const deletedRecord = await record.delete();

    return res.send(`<div style="text-align: center">
   <h1 style="color: red;">Movie deleted</h1>
   <a style="background-color:yellowgreen; color:#fff; border-radius:1rem; padding:1rem 3rem; text-decoration:none" href="http://localhost:3000/dashboard">Back to Dashboard</a>
   </div>`)
    // res.status(200).json({
    //   msg: "Movie deleted successfully",
    //   deletedRecord,
    // });
  } catch (error) {
    res.status(500).json({
      msg: "failed to delete",
      route: "/delete/:id",
    });
  }
}

//this line today
export async function dashboard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    //  const record = await MovieInstance.findAll({where: {},limit, offset})
    const record = await MovieInstance.find({ limit, offset,
      include:[{
         model:UserInstance,
         attributes:['id', 'fullname',  'username', 'email'],
         as:'user'
        }
        ]
   });
   res.render("dashboard",{record})

  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}

export async function updatePage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    //  const record = await MovieInstance.findAll({where: {},limit, offset})
    const record = await MovieInstance.find({ limit, offset,
      include:[{
         model:UserInstance,
         attributes:['id', 'fullname',  'username', 'email'],
         as:'user'
        }
        ]
   });
   //res.render("updateMovieForm",{record})

  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}
export async function newMoviePage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    //  const record = await MovieInstance.findAll({where: {},limit, offset})
    const record = await MovieInstance.find({ limit, offset,
      include:[{
         model:UserInstance,
         attributes:['id', 'fullname',  'username', 'email'],
         as:'user'
        }
        ]
   });
   res.render("addNewMovie")

  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}