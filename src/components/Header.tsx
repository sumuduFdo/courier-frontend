import { useNavigate } from "react-router-dom";
import { logoutHandler } from "./util/lougoutHandler";
import classes from "./Header.module.css";

const Header = (props: { isloggedIn: boolean, setLoggedIn: (value: boolean) => void }) => {

  const navigate = useNavigate();


  return (
    <header className={classes.header}>
      <span className={classes.logo}>
        Shipment
        <br /> Manager
      </span>

      {props.isloggedIn && (
        <button className={classes.button} onClick={() => {logoutHandler(props.setLoggedIn, navigate);}}>
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
