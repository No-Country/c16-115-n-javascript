

import { 
  getUserById, 
  getUsers, 
  recoverAccount, 
  updateUser 
} from "../controllers/users.controller.js";




export const getUserByIdHandler = async (req, res) => {
  // Darle la authorizacion del token
  const { id } = req.params;

  try {

    const {ok, user, bookings, trips, tickets} = await getUserById(id)
    res.status(200).json({ ok, user, bookings, trips, tickets });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal Server error' });
  }
}




export const getUsersHandler = async (req, res) => {
  // Darle la authorizacion del token
  const { name } = req.query;

  // console.log("REQ.USERS: ", req.user);
  // const { role: userRole } = req.user;

  // if (userRole !== "admin") {
  //   return res.status(401).json({ok: false, message: "Unauthorized" })
  // }

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
  const { 
    fullName, 
    email, 
    password, 
    isDriver, 
    plate, 
    country,
    province,
    city, 
    streetName,
    streetNumber, 
    role, 
    active, 
    profileImg, 
    carPhotos,
    favoriteArtists,
    favoriteSong,
    deleted
  } = req.body;

  console.log({favoriteArtists, favoriteSong})


  try {

    const { ok, message, user } = await updateUser(id, userRole, { 
      fullName, 
      email, 
      password, 
      isDriver, 
      plate, 
      countryUser: country,
      province,
      city, 
      streetName,
      streetNumber, 
      role, 
      active, 
      profileImg, 
      carPhotos,
      favoriteArtists,
      favoriteSong,
      deleted
    });

    res.status(200).json({ ok, message, user });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
}
