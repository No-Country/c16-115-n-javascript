import { createNewUser, login, recoverAccount, resetPassword, verifiedEmail } from "../controllers/auth.controller.js";


export const registerHandler = async (req, res) => {
  const { 
    email, 
    password, 
    streetName, 
    streetNumber, 
    city, 
    province, 
    country: countryUser, 
    fullName, 
    phone, 
    isDriver, 
    plate 
  } = req.body;

  if (!email 
    || !password 
    || !fullName 
    || !phone 
    || !streetName 
    || !streetNumber 
    || !province 
    || !city 
    || !countryUser) {
    return res.status(400).json({ ok: false, message: "Missing dates" });
  }


  try {

    const { ok, token, message } = await createNewUser(
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
      plate)

    res.status(201).json({ ok, token, message })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ ok, message: "Internal server error" });
  }
}



export const verifyEmailHandler = async (req, res) => {

  try {

    // Obtener el token
    const { token } = req.params

    // Verificar la existencia del usuario

    const { ok } = await verifiedEmail(token)

    if (!ok) {
      return res.redirect('http://localhost:5173/error-verified')
    }

    return res.redirect('http://localhost:5173/auth/sign-in')
    
  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      message: error.message,
    }
  }

}


export const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {

    const { ok, token, message } = await login(email, password)
    res.status(200).json({ ok, message, token });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const forgotPasswordHandler = async (req, res) => {

  const { email } = req.body;

  try {

    const { ok, message } = await recoverAccount(email)

    if (!ok) {
      return res.status(400).json({ ok, message })
    }
    return res.status(200).json({ ok, message })
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Interbal Server Error"});
  }

}

export const resetPasswordHandler = async (req, res) => {
  const { token, password } = req.body;

  try {

    const { ok, message, newToken } = await resetPassword(token, password)

    if (!ok) {
      return res.status(400).json({ ok, message })
    }
    return res.status(200).json({ ok, token: newToken })

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error"});
  }
}