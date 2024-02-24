import { createNewUser, login } from "../controllers/auth.controller.js";


export const registerHandler = async (req, res) => {
  const { email, password, streetName, streetNumber, city, province, country: countryUser, fullName, phone, isDriver, plate } = req.body;

  if (!email || !password || !fullName || !phone || !streetName || !streetNumber || !province || !city || !countryUser) {
    return res.status(400).json({ ok: false, message: "Missing dates" });
  }


  try {

    const { ok, token, message } = await createNewUser(email, password, streetName, streetNumber, city, province, countryUser, fullName, phone, isDriver, plate)

    res.status(201).json({ ok, token, message })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ ok, message: "Internal server error" });
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