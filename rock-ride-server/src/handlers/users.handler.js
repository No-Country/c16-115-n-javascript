

import { getUserById, getUsers, updateUser } from "../controllers/users.controller.js";
import { User } from "../database.js";



export const getUserByIdHandler = async (req, res) => {
  // Darle la authorizacion del token
  const { id } = req.params;

  try {

    const {ok, user} = await getUserById(id)
    res.status(200).json({ ok, user });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal Server error' });
  }
}




export const getUsersHandler = async (req, res) => {
  // Darle la authorizacion del token
  const { name } = req.query;
  try {

    const {ok, users} = await getUsers(name);
    res.status(200).json({ ok, users });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
}



export const putUserHandler = async (req, res) => {
  const { id } = req.params;
  const { role: userRole } = req.user;
  console.log(userRole);
  const { fullName, email, password, isDriver, plate, address, city, role, active, profileImg, carPhotos } = req.body;
  console.log(active);
  try {

 
    const { ok, message, user } = await updateUser(id, userRole, { fullName, email, password, isDriver, plate, address, city, role, active, profileImg, carPhotos });
    res.status(200).json({ ok, message, user });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
}



