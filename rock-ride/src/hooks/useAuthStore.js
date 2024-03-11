import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../redux/features/authSlice";
import { driveRockApi } from "../api";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await driveRockApi.post("auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      const decodedToken = jwtDecode(data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      const { data: userData } = await driveRockApi.get(
        `users/${decodedToken.id}`
      );
      dispatch(onLogin({ ...userData }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("token-init-date", new Date().getTime());
        const { data: userData } = await driveRockApi.get(
          `users/${decodedToken.id}`
        );
        dispatch(onLogin({ ...userData }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  }


  return {
    errorMessage,
    status,
    user,

    startLogin,
    checkAuthToken,
    startLogout
  };
};
