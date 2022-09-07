import express,{Request,Response,NextFunction}
 from 'express'
 import {v4 as uuidv4} from 'uuid'
 import {registerSchema,options,loginSchema,generateToken} from '../utils/utils'
 import {UserInstance} from '../model/userModel'
 import bcrypt from 'bcryptjs'
import { MovieInstance } from '../model/movieModel'

export async function RegisterUser(req:Request, res:Response, next:NextFunction) {
    const id = uuidv4()
    try{ 
        const validationResult = registerSchema.validate(req.body,options)
        if( validationResult.error){
           return res.status(400).json({
              Error:validationResult.error.details[0].message
           })
        }
        const duplicatEmail = await UserInstance.findOne({email:{email:req.body.email}})
        if(duplicatEmail){
         return res.status(409).json({
            msg:"Email is used, please change email"
         })
        }

      //   const username = await UserInstance.findOne({where:{username:req.body.username}})
      //   if(username){
      //    return res.status(409).json({
      //       msg:"username number is used"
      //    })
      //   }


      const passwordHash = await bcrypt.hash(req.body.password,8)
       const record = await UserInstance.create({ 
          id:id,
          fullname:req.body.fullname,
          username:req.body.username,
          email:req.body.email,
          password:passwordHash
        })
       res.status(201).json({
           msg:"You have successfully created a user",
           record
       })

      // res.redirect("/login");

// res.render('register');
      //THIS LINE
    }catch(err){
      console.log(err)
       res.status(500).json({
        msg:'failed to register',
        route:'/register'
       })
    }
 
 }


 export async function LoginUser(req:Request, res:Response, next:NextFunction) {
   const id = uuidv4()
   try{ 
       const validationResult = loginSchema.validate(req.body,options)
       if( validationResult.error){
          return res.status(400).json({
             Error:validationResult.error.details[0].message
          })
       }
       const User = await UserInstance.findOne({where:{email:req.body.email}}) as unknown as {[key:string]:string}
        
       const {id} =User
       const token = generateToken({id})
      const validUser = await bcrypt.compare(req.body.password, User.password);

      if(!validUser){
         res.send(`<div style="text-align: center">
   <h1 style="color: red;">Password incorrect</h1>
   <a style="background-color:yellowgreen; color:#fff; border-radius:1rem; padding:1rem 3rem; text-decoration:none" href="http://localhost:3000/login">Back to Login</a>
   </div>`)
      //    res.status(401).json({
      //       message:"Password do not match"
      //   })
      }

      if (validUser) {
         res.cookie("token", token, {
           maxAge: 1000 * 60 * 60 * 24 * 7,
           sameSite: "strict",
           httpOnly: true,
         });
         res.cookie("id",id, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "strict",
            httpOnly: true,
         })
            res.redirect("/dashboard")
       } 

}catch(err){
   res.send(`<div style="text-align: center">
   <h1 style="color: red;">Not Registered</h1>
   <a style="background-color:yellowgreen; color:#fff; border-radius:1rem; padding:1rem 3rem; text-decoration:none" href="http://localhost:3000/register">Click to register</a>
   </div>`)
   // res.status(500).json({
   //  msg:'failed to login',
   //  route:'/login'
   // })
}

}

export async function LogoutUser(req: Request, res: Response, next: NextFunction) {
   res.cookie("token", '', {
       maxAge: 0,
       sameSite: "strict",
       httpOnly: true,
     });
       res.cookie("id",'', {
         maxAge: 0,
         sameSite: "strict",
         httpOnly: true,
       })
   res.redirect('/');
}


export async function getUsers(
   req: Request,
   res: Response,
   next: NextFunction
 ) {
   try {
     const limit = req.query?.limit as number | undefined;
     const offset = req.query?.offset as number | undefined;
     //  const record = await MovieInstance.findAll({where: {},limit, offset})
     const record = await UserInstance.find({ limit, offset,
     include:[{
      model:MovieInstance,
      as:'todo'
     }
     ]
     });
     res.status(200).json({
       msg: "You have successfully fetch all users",
       record: record
     });
   } catch (error) {
     res.status(500).json({
       msg: "failed to read",
       route: "/read",
     });
   }
 }

  export async function registration(req:Request, res:Response, next:NextFunction) {
   const id = uuidv4()
   try{ 
       res.render('register')

}catch(err){
   res.status(500).json({
    msg:'failed to login',
    route:'/login'
   })
}

}
  export async function login(req:Request, res:Response, next:NextFunction) {
   const id = uuidv4()
   try{ 
       res.render('login')

}catch(err){
   res.status(500).json({
    msg:'failed to login',
    route:'/login'
   })
}

}

 
