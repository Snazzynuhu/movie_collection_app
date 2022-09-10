import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import  {MovieInstance}  from "../model/movieModel";
import { UserInstance } from "../model/userModel";
import { createMovieSchema, options, updateMovieSchema } from "../utils/utils";
import {any} from "joi"


export async function createMovie(
  req:Request, 
  res:Response, 
  next:NextFunction) {
    try{
      const {title,description, genre,imgUrl, rating,year}= req.body;
      const validationResult = createMovieSchema.validate(req.body, options);
      if (validationResult.error) {
        return res.status(400).json({
          Error: validationResult.error.details[0].message,
        });
      }
      const newMovie = new MovieInstance(req.body);
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

export async function getMovies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    const record = await MovieInstance.find();
   res.render("index",{record})
    // res.status(200).json({
    //   msg: "You have successfully fetch all movies",
    //   record: record
    // });
  } catch (error) {
    res.status(500).json({
      msg: "failed to fetch all movies",
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
    const record = await MovieInstance.findById(id);
    return record
    // res.status(200).json({
    //   msg: "Successfully gotten movie data",
    //   record,
    // });
  } catch (error) {
    res.status(500).json({
      msg: "failed to fetch single movie",
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
    const { title, description,imgUrl, genre,rating,year } = req.body;
    const validationResult = updateMovieSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const record = await MovieInstance.findByIdAndUpdate(id, req.body, {
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
    const record = await MovieInstance.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).json({
        msg: "Movie not deleted",
      });
    }
    return res.send(`<div style="text-align: center">
   <h1 style="color: red;">Movie deleted</h1>
   <a style="background-color:yellowgreen; color:#fff; border-radius:1rem; padding:1rem 3rem; text-decoration:none" href="http://localhost:3000/dashboard">Back to Dashboard</a>
   </div>`)
    // res.status(200).json({
    //   msg: "Movie deleted successfully",
    //   record
    // });
  } catch (error) {
    res.status(500).json({
      msg: "failed to delete",
      route: "/delete/:id",
    });
  }
}

export async function dashboard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    const record = await MovieInstance.find();
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
  //   const record = await MovieInstance.find({ limit, offset,
  //     include:[{
  //        model:UserInstance,
  //        attributes:['id', 'fullname',  'username', 'email'],
  //        as:'user'
  //       }
  //       ]
  //  });
    const record = await MovieInstance.find();
  //  res.render("updateMovieForm",{record})

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
  //   const record = await MovieInstance.find({ limit, offset,
  //     include:[{
  //        model:UserInstance,
  //        attributes:['id', 'fullname',  'username', 'email'],
  //        as:'user'
  //       }
  //       ]
  //  });
    const record = await MovieInstance.find();
   res.render("addNewMovie")

  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}