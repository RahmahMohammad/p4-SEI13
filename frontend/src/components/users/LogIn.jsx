import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import API_URL from '../../utility/apiConfig'

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";
import { Alert } from "react-bootstrap";


export default function LogIn(props) {
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [LoginError, setLoginError] = useState();
  const [error, setError] = useState(false);//prevent page from collapse

  //to valid the form's inputs
  const [p, setP] = useState({
    email: {
      value: "",
      valid: false
    },

    password: {
      value: "",
      valid: false
    },
  })

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${API_URL}/api/users/login`, credentials)
      .then((res) => {
        const token = res.data.token;
        const msg = res.data.msg;
        const currentUser = jwt_decode(token, "SECRET").user;

        if (token) {
          setP({
            email: { valid: !!credentials.email },
            password: { valid: !!credentials.password }
          })

          localStorage.setItem("jwtToken", token);
          props.loginCallback();

          //if user.role == admin >>>> history.push("/ControlPanel");
          //if 1st login >>>> history.push("/OwnerProfile")
          //if 2st login >>>> history.push("/Organizerprofile")
          if (currentUser.role == "owner") {
            history.push("/OwnerProfile");
          } else {
            history.push("/OrganizerProfile")
          }

        } else {
          setLoginError("Email or Passwoed are Incorrect")
        }
      }).catch((err) => {
        setError("Somthing is wrong")
      });
  };

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="5">
          <br />
          <br />
          <MDBCard>
            <MDBCardBody>
              <br />
              <MDBCardHeader className="form-header rounded">

                <h3 className="text-center my-3">
                  <strong>User LogIn</strong>
                </h3>
              </MDBCardHeader>
              <form>
                <div className="black-text">
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    name="email"
                    validate
                    error="wrong"
                    success="right"
                    className={p.email.valid ? "form-control is-valid" : "form-control is-invalid"}
                    onChange={onChangeInput}
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    name="password"
                    validate
                    className={p.password.valid ? "form-control is-valid" : "form-control is-invalid"}
                    onChange={onChangeInput}
                  />
                </div>

                <div className="text-center mt-4">
                  <MDBBtn
                    color="deep-purple darken-1 white-text"
                    className="mb-"
                    type="submit"
                    onClick={(e) => onSubmit(e)}
                  >
                    Submit
                      </MDBBtn>
                </div>
                <Alert>{LoginError}</Alert>
                {/* <Alert variant={"danger"}>{error}</Alert> */}
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      {error && (
        <Alert variant={"danger"}>
          {error}
        </Alert>
      )}
      <br />
      <br />
    </MDBContainer>


  );
}
