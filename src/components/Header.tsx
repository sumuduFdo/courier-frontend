import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";

const Header = (props: { isloggedIn: boolean, onLogout: Function, }) => {

  const navigate = useNavigate();

  const logoutHandler = () => {
    props.onLogout();
    navigate('/login')
  }

  return (
    <header className={classes.header}>
      <span className={classes.logo}>
        Shipment
        <br /> Manager
      </span>

      {props.isloggedIn && (
        <button className={classes.button} onClick={logoutHandler}>
            Logout
        </button>
      )}

      {!props.isloggedIn && (
        <div className={classes.buttonwrapper}>
          <button className={classes.button} style={{ marginRight: "1rem" }} onClick={() => { navigate('/login')}}>
            Login
          </button>
          <button className={classes.button}  onClick={() => { navigate('/register')}}>
            Register
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
