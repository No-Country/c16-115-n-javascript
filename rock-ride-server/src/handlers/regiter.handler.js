import { createNewUser } from "../controllers/registrer.controller.js";


export const registerHandler = async (req, res) => {
  const { email, password, address, city, fullName, phone, isDriver, plate } = req.body;
  
  if ( !email || !password || !fullName || !phone || !address || !city ) {
    return res.status(400).json({ ok: false, message: "Email and password are required" });
  }


  try {

    const { user, token } = await createNewUser(email, password, address, city, fullName, phone, isDriver, plate)
    
    res.status(201).json({ ok: true, token })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
}