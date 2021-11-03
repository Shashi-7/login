import React, { useState } from "react";
import "./loginpage.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


const Login = ({ setLoginUser }) => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setshowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const clientId = "1011870679214-0vnm9tq196n9roo85bej42d92cv39n06.apps.googleusercontent.com";

  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const onLoginSuccess = (res) => {
    console.log(res);
    axios.post("http://localhost:9002/login", 'data').then(res => {
      console.log("Google login success", res);
    })
  
    setShowLoginButton(false);
    setShowLogoutButton(true);
  }

  const onFailureSuccess = (res) => {
    console.log('Login Failed', res);
  }

  const onSignoutSuccess = () => {
    alert("You have been signed out!");
    setShowLoginButton(true);
    setShowLogoutButton(false);
  }

  const login = () => {
    axios.post("http://localhost:9002/login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
      history.push("/");
    });
  };


  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your Email"
      ></input>
      <input
        type= {showPassword ? "text": "password"}
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your Password"
      >
      </input>
      <Button className="password-button"  
                onClick={() => {if(showPassword === false ) {setshowPassword (true)} else {setshowPassword(false)}}}
        > {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
        </Button>
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/register")}>
        Register
      </div>
      <div>Or Login Using</div>
      <div>
        {showLoginButton ? 
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onLoginSuccess}
            onFailure={onFailureSuccess}
           cookiePolicy={'single_host_origin'}
          /> : null
        }

        {showLogoutButton ? 
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onSignoutSuccess}
          >
          </GoogleLogout> : null
        }
      </div>
    </div>
  );
};

export default Login;
