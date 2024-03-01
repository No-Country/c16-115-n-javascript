import { Op } from "sequelize";
import { Booking, Trip, User } from "../database.js";
import { validate as validateUuid } from "uuid";

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
    });

    const bookings = await Booking.findAll({
      where: { userId: id, status: { [Op.not]: "canceled" } },
    });
    const trips = await Trip.findAll({ where: { userId: id, deleted: false } });

    return {
      ok: true,
      user,
      bookings,
      trips,
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
          },
        },
      });
      if (!users.length) {
        return {
          ok: false,
          message: "User not found",
        };
      } else {
        console.log(users);
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
    });
    return {
      ok: true,
      users,
    };
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
    address,
    city,
    role,
    active,
    profileImg,
    carPhotos,
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

    if (userRole === "user") {
      if (role !== undefined || active !== undefined) {
        return {
          ok: false,
          message:
            "Permission denied: Regular users cannot update role or active status.",
        };
      }

      const [rowsUpdated, [updatedUser]] = await User.update(
        {
          fullName,
          email,
          password,
          isDriver,
          plate,
          address,
          city,
          profileImg,
          carPhotos,
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
          address,
          city,
          profileImg,
          carPhotos,
        },
        {
          where: { id },
          returning: true,
        }
      );

      if (rowsUpdated > 0) {
        return {
          ok: true,
          event: updatedUser,
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
