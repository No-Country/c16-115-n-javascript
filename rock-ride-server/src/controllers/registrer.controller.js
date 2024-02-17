
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

import { User } from "../database.js";
import { useLocation } from "../helpers/useLocation.js";




export const createNewUser = async (email, password, address, city, fullName, phone, isDriver, plate) => {

  const { coordinates, country } = await useLocation(address, city)

  const userData = {
    email,
    password: bcryptjs.hashSync( password ),
    fullName,
    address,
    city,
    country,
    location: coordinates,
    phone,
    isDriver,
    plate
  }

  try {
    
    const [ user, created ]= await User.findOrCreate({ 
      where: {
        email: userData.email
      }, 
      defaults: userData
    })

    if (created === false) {
      return { ok: false, message: "The email already exist" }
    }


    if (created === true) {

      const payload = {
        id: user.id,
        role: user.role,
      }
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '30d',
      })
      return {
        ok: true,
        token
      }
    }

  } catch (error) {

    console.log(error.message);
    return {
      ok: false,
      message: error.message,
    }
  }

}