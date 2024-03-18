import { Op } from "sequelize";
import { Booking, Ticket, Trip, User } from "../database.js";
import { validate as validateUuid } from "uuid";
import { useLocation } from "../helpers/useLocation.js";

export const getUserById = async (id) => {
  if (!validateUuid(id)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid eventId format" });
  }

  try {
    const user = await User.findByPk(id, {
      where: {
        deleted: false,
      },
      attributes: {
        exclude: ['deleted','password', 'createdAt', 'updatedAt', 'code', 'emailVerified'],
      },
    });

    const bookings = await Booking.findAll({
      where: { userId: id, status: { [Op.not]: "canceled" } },
    });
    const trips = await Trip.findAll({ where: { userId: id, deleted: false } });
    const tickets = await Ticket.findAll({ where: { userId: id } });

    return {
      ok: true,
      user,
      bookings,
      trips,
      tickets,
    };
  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      message: "Error fetching user",
    };
  }
};

export const getUsers = async (name) => {
  try {
    if (name) {
      const users = await User.findAll({
        where: {
          deleted: false,
          fullName: {
            [Op.iLike]: `%${name.toLowerCase()}%`,
          }
        },
        attributes: {
          exclude: ['deleted','password', 'createdAt', 'updatedAt', 'code', 'emailVerified'],
        },
      });
      if (!users.length) {
        return {
          ok: false,
          message: "User not found",
        };
      } else {
  
        return {
          ok: true,
          users,
        };
      }
    }

    const users = await User.findAll({
      where: {
        deleted: false,
      },
      attributes: {
        exclude: ['deleted','password', 'createdAt', 'updatedAt', 'code', 'emailVerified'],
      },
    });

    
    return {
      ok: true,
      users
    }
  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      message: "Internal server error",
    };
  }
};

export const updateUser = async (
  id,
  userRole,
  {
    fullName,
    email,
    password,
    isDriver,
    plate,
    countryUser,
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
    deleted,
  }
) => {

  try {


  const user = await User.findByPk(id);
  
  if (!user) {
    return {
      ok: false,
      message: "User not found",
    };
  }
  console.log("____________COUNTRY, PROVINCE, ADRDRES____________");
  console.log({ countryUser, province, city, streetName, streetNumber });




  if (city || province || countryUser || streetName) {
    const locationResult = await useLocation(
      `${streetName} ${streetNumber ? streetNumber : ''}`,
      city ? city : user.city,
      province ? province : user.stateOrProvince,
      countryUser ? countryUser : user.country,
    );
    var {
      coordinates,
      streetNameGoogle,
      streetNumberGoogle,
      cityGoogle,
      stateOrProvince,
      country,
    } = locationResult;
  }

  console.log(user.address);

  console.log(streetNumberGoogle);
  const formateAddres =
    streetNumberGoogle === null
      ? `${streetNameGoogle} ${streetNumber ? streetNumber : user.address.split(' ').reverse().at(0)}`
      : `${streetNameGoogle} ${streetNumberGoogle}`;


  console.log("FORMATE ADRRESS______________");
  console.log(formateAddres);

  // console.log(formateAddres);




    if (role !== undefined || active !== undefined) {
      return {
        ok: false,
        message:
          "Permission denied: Regular users cannot update role or active status.",
      };
    }

    const parsedFavoriteArtists = favoriteArtists ? JSON.parse(favoriteArtists) : null;


    if (userRole === "user") {

      const [rowsUpdated, [updatedUser]] = await User.update(
        {
          fullName,
          email,
          password,
          isDriver,
          plate,
          address: formateAddres,
          location: coordinates,
          city: cityGoogle,
          stateOrProvince,
          country, 
          profileImg,
          carPhotos,
          favoriteArtists: parsedFavoriteArtists,
          favoriteSong,
          deleted,
        },
        {
          where: { id },
          returning: true,
        }
      );

      console.log(rowsUpdated, updateUser);

      if (rowsUpdated > 0) {
        return {
          ok: true,
          event: updatedUser,
        };
      } else {
        return {
          ok: false,
          message: "User not found",
        };
      }
    }

    if (userRole === "admin") {
      const [rowsUpdated, [updatedUser]] = await User.update(
        {
          role,
          active,
          fullName,
          email,
          password,
          isDriver,
          plate,
          address: formateAddres,
          location: coordinates,
          city: cityGoogle,
          stateOrProvince,
          country, 
          profileImg,
          carPhotos,
          favoriteArtists: parsedFavoriteArtists,
          favoriteSong,
          deleted,
        },
        {
          where: { id },
          returning: true,
        }
      );

      if (rowsUpdated > 0) {
        return {
          ok: true,
          user: updatedUser,
          message: "User successfully updtaded",
        };
      } else {
        return {
          ok: false,
          message: "User not found",
        };
      }
    }
  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      message: "Internal server error",
    };
  }
};

export const recoverAccount = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email,
        deleted: true,
      },
    });

    if (!user) {
      return {
        ok: false,
        message: "User not found",
      };
    }

    user.deleted = false;
    await user.save();

    return {
      ok: true,
      message: "User successfully recovered",
    };
  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      message: "Internal server error",
    };
  }
};
