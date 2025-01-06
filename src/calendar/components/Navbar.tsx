import { useAuthStore } from "../../hooks/useAuthStore";

export const Navbar = () => {
  const { startLogout, name } = useAuthStore();

  const onLogout = () => {
    startLogout();
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; {name}
      </span>

      <button className="btn text-white">
        <i className="fas fa-sign-out-alt"></i>
        <span onClick={onLogout}> Salir</span>
      </button>
    </div>
  );
};
