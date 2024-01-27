// SignUpPage.js
import React, { useState } from "react";
import "./signinpage.css";
import { api_glue, error_report_message } from "../../constants";
import { useSnackbar } from "notistack";
import { useLogin } from "../../Contexts/LoginContext";

const SigninPage = () => {
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginData, setLoginData] = useLogin();
  const snackbar = useSnackbar();

  const handleSubmit = (event) => {
    event.preventDefault();


    // Submit the form data to a server
    api_glue.login(phoneNumber, password).then(login => {
      if (login.status == 'success') {
        api_glue
          .check_login()
          .then(login_data => {
            if (login_data) {
              snackbar.enqueueSnackbar({ message: 'logged in successfully please wait while we redirect you', variant: login.status });
              setLoginData(login_data); // this will redirect automatically
            }
          }).catch(err => {
            snackbar.enqueueSnackbar({ message: error_report_message, variant: 'error' })
          })
      } else {
        snackbar.enqueueSnackbar({ message: login.data.message, variant: login.status });
      }
    }).catch(err => {
      console.log(err);
      snackbar.enqueueSnackbar({ message: error_report_message, variant: 'error' })
    });

  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default SigninPage;
