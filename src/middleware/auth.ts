import express,{Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
const secret = process.env.JWT_SECRET as string
import {UserInstance} from '../model/userModel'

export async function auth(req:Request | any, res:Response, next:NextFunction){
    try{
        const authorization = req.headers.authorization;
        const cookie = req.cookies.token;
    if(!authorization && !cookie){
       
        return  res.send(`<div style="text-align: center">
         <h1 style="color: red;">Not Logged In</h1>
         <a style="background-color:yellowgreen; color:#fff; border-radius:1rem; padding:1rem 3rem; text-decoration:none" href="http://localhost:3000/login">Back to Login Page</a>
        </div>`)
    //   res.status(401).json({
    //       Error: 'Kindly sign in as a user'
    //   })
    // res.redirect('/')

    }
    const token = authorization?.slice(7, authorization.length) as string || cookie;

    let verified = jwt.verify(token, secret);

    if(!verified){
        return res.status(401).json({
            Error:'User not verified, you cant access this route'
        })
    }
   const {id} = verified as {[key:string]:string}
  
   const user = await UserInstance.findOne({where:{id}})

   if(!user){
       return res.status(404).json({
         Error:'User not verified'
       })
   }

req.user = verified  
next()
    } catch(error){
        return res.send(`<div style="text-align: center">
        <h1 style="color: red;">Not Logged In</h1>
        <a style="background-color:yellowgreen; color:#fff; border-radius:1rem; padding:1rem 3rem; text-decoration:none" href="http://localhost:3000/login">Back to Login Page</a>
        </div>`)
        // res.redirect('/login')
        // res.status(403).json({
        //     Error:'User not logged in'
        // })
    }
}