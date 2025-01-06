import { useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import "./login.css";
import Swal from "sweetalert2";

const loginFormFields = {
  loginEmail: "andres@andres.com",
  loginPassword: "Andr@5",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerConfirmPassword: "",
};

export const LoginPage = () => {

  //@ts-expect-error type not defined
  const {loginEmail, loginPassword, onInputChange: onLoginInputChange} = useForm(loginFormFields);

  //@ts-expect-error type not defined
  const {registerName, registerEmail, registerPassword, registerConfirmPassword, onInputChange: onRegisterInputChange} = useForm(registerFormFields);

  const { startLogin, errorMessage, startRegister } = useAuthStore();

  useEffect(() => {    
    if (errorMessage !== null && errorMessage !== "No token found" && errorMessage.length > 0) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage])
  

  const loginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startLogin({email: loginEmail, password: loginPassword});
  }

  const registerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (registerPassword !== registerConfirmPassword) {
      return Swal.fire("Error en la autenticación", "Las contraseñas no coinciden", "error");
    }

    startRegister({name: registerName, email: registerEmail, password: registerPassword});
  }


  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form
            onSubmit={loginSubmit}
          >
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form
          onSubmit={registerSubmit}
          >
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerConfirmPassword"
                value={registerConfirmPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
