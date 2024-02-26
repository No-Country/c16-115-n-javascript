
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid' 

import { User } from "../database.js";
import { useLocation } from "../helpers/useLocation.js";
import { getTemplate, getTemplateResetPassword, sendEmail } from '../../config/mail.config..js';





export const createNewUser = async (
  email, 
  password, 
  streetName, 
  streetNumber, 
  city, 
  province, 
  countryUser, 
  fullName, 
  phone, 
  isDriver, 
  plate) => {

  const { 
    ok, 
    message, 
    coordinates, 
    streetNameGoogle, 
    streetNumberGoogle, 
    cityGoogle, 
    stateOrProvince, 
    country } = await useLocation(`${ streetName } ${ streetNumber }`, city, province, countryUser)

  if (!ok) return { ok, message }

  const formateAddres = streetNumberGoogle === null 
    ?`${ streetNameGoogle } ${ streetNumber }`
    : `${ streetNameGoogle } ${ streetNumberGoogle }` 

  const code = uuidv4()

  const userData = {
    email,
    password: bcryptjs.hashSync( password ),
    fullName,
    address: formateAddres,
    city: cityGoogle,
    stateOrProvince,
    country,
    location: coordinates,
    code,
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
        email: user.email,
        code,
        role: user.role,
      }
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '30d',
      })


      const template = getTemplate(user.fullName, token)

      await sendEmail(user.email, "Verify your email", template)


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



export const verifiedEmail = async (token) => {


  const data = jwt.verify(token, process.env.SECRET_KEY)


  if (data === null) {
    return { ok: false, message: "The token is invalid" }
  }

  const user = await User.findByPk(data.id)


  if (user === null) {
    return { ok: false, message: "The user doesn't exist" }

  }

  const { code } = data
  // Verificar el código

  if (code !== user.code) {
    return { ok: false, message: "error code" }
  } else {
    user.emailVerified = true

    await user.save()

    return { ok: true, message: "Email verified" }
  }

}



export const login = async (email, password) => {
  try {

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return { ok: false, message: "The email doesn't exist" }
    }

    if (user.deleted) {
      return { ok: false, message: "The account no longer exists" }
    }

    if (!user.active) {
      return { ok: false, message: "The user is inactive" }
    }

    const validPassword = bcryptjs.compareSync(password, user.password)

    if (!validPassword) {
      return { ok: false, message: "The password is incorrect" }
    }

    const payload = {
      id: user.id,
      role: user.role,
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '30d',
    })

    return {
      ok: true,
      message: "Login successful",
      token
    }

  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      message: error.message,
    }
  }
}

export const recoverAccount = async (email) => {
  try {
    
    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      return { ok: false, message: "The email doesn't exist" }
    }

    const code = uuidv4()

    user.code = code

    await user.save()

    const payload = {
      id: user.id,
      code,
      role: user.role,
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '24h',
    })

    const template = getTemplateResetPassword(user.fullName, token)

    await sendEmail(user.email, "Recover your account", template)

    return {
      ok: true,
      message: "Recover account successful"
    }

  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      message: error.message,
    }
  }
}




export const resetPassword = async (token, password) => {
  try {

    const data = jwt.verify(token, process.env.SECRET_KEY)

    if (data === null) {
      return { ok: false, message: "The token is invalid" }
    }

    const user = await User.findByPk(data.id)

    if (user === null) {
      return { ok: false, message: "The user doesn't exist" }
    }

    user.password = bcryptjs.hashSync(password)

    await user.save()

    const payload = {
      id: user.id,
      role: user.role,
    }

    const newToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '30d',
    })


    return {
      ok: true,
      newToken,
    }

  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      message: error.message,
    }
  }
}