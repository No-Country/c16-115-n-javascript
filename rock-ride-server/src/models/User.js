import { DataTypes, UUIDV4 } from 'sequelize';


export const UserModel =  (sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDriver: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    plate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    carPhotos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    }
  })
}