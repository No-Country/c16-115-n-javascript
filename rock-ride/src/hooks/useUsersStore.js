import { useDispatch, useSelector } from "react-redux"
import { driveRockApi } from "../api";
import { onLoadUsers, onSetActiveUser, onUpdateUser, onDeleteUser, onCleanActive } from "../redux/features/userSlice";

export const useUsersStore = () => {
  const dispatch = useDispatch();
  const { users, activeUser } = useSelector((state) => state.user);

  const setActiveUser = (user) => {
    dispatch(onSetActiveUser(user));
  };

  const startLoadingUsers = async () => {
    try {

      const { data } = await driveRockApi.get("/users");
      dispatch(onLoadUsers(data.users));   
    } catch (error) {
      console.log("Error al cargar los usuarios", error.message);
    }
  };

  const startDeletingEvent = async (deleted) => {
    try {
      await driveRockApi.put(`/trips/${activeUser.id}`, deleted);
      dispatch(onDeleteUser());

    } catch (error) {
      console.log(error);
     /*  Swal.fire("Error al eliminar", error.response.data.msg, "error"); */
    }
  };


  const startUpdateUser = async (id, formData) => {

    console.log(id, console.log(Array.from(formData.entries())));

    try {
      const { data } = await driveRockApi.put(`/users/update/${id}`, formData);
      dispatch(onUpdateUser(data.user));
      console.log(data);
      return data
    } catch (error) {
      console.log(error);
    }
  };

  const cleanActiveUser = () => {
    dispatch(onCleanActive());
  }



  return {
    users,
    activeUser,
    setActiveUser,
    startLoadingUsers,
    startDeletingEvent,
    startUpdateUser,
    cleanActiveUser,
  }
}