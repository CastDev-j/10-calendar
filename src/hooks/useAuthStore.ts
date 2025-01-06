import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import {
  clearErrorMessages,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";
import { StartLoginProps, StartRegisterProps } from "../types";

export const useAuthStore = () => {
  //@ts-expect-error type not defined
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }: StartLoginProps) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", { email, password });

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());

      dispatch(
        onLogin({
          name: data.data.name,
          uid: data.data.uid,
        })
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));

      setTimeout(() => dispatch(clearErrorMessages()), 10);
    }
  };

  const startRegister = async ({
    name,
    email,
    password,
  }: StartRegisterProps) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init date", new Date().getTime().toString());
      dispatch(
        onLogin({
          name: data.data.name,
          uid: data.data.uid,
        })
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

      dispatch(onLogout(error?.response?.data?.msg || "Error en el registro"));
      setTimeout(() => dispatch(clearErrorMessages()), 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(onLogout("No token found"));
      return;
    }

    try {
      const { data } = await calendarApi.get("/auth/renew");

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("token-init date", new Date().getTime().toString());

      dispatch(
        onLogin({
          name: data.data.name,
          uid: data.data.uid,
        })
      );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout({}));
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout({}));
  };

  return {
    //* Properties
    status,
    user,
    name: user?.name,
    errorMessage,

    //* Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
