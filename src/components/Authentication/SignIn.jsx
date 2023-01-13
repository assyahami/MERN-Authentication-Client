import React, { useState, useEffect } from "react";
import { AuthenticationContainer } from "../layout/AutheticationContainer";
import { Form, Button, InputGroup } from "react-bootstrap";
import { CaretRightFill, EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  closeNotification,
  loadingOn,
  openNotification,
} from "../../redux/Slice";
import baseUrl from "../../utils/baseUrl";
import { storeCookie } from "../../utils/Cookie";
import Cookies from "js-cookie";

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPWD, setShowPWD] = useState(false);
  const [verified, setVerified] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let getToken = Cookies.get("token");

  const handleOnSubmit = async (data) => {
    try {
      dispatch(loadingOn());
      const login = await axios.post(`${baseUrl}/api/v1/user/login`, data);
      storeCookie(login.data);
      navigate("/");
      dispatch(closeNotification());
    } catch (error) {
      dispatch(openNotification({ message: error.response.data.message }));
      setTimeout(() => {
        dispatch(closeNotification());
      }, 3000);
    }
  };

  const handleChangeRecaptcha = (values) => {
    setVerified(false);
  };

  const handleShowPassword = () => {
    setShowPWD(!showPWD);
  };

  useEffect(() => {
    if (getToken) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <AuthenticationContainer>
        <div className="form-container-signin">
          <Form onSubmit={handleSubmit(handleOnSubmit)}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email-ID</Form.Label>
              <Form.Control
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter email"
              />
              {errors?.email && <Form.Text>{errors?.email?.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPWD ? "text" : "password"}
                  {...register("password", {
                    required: `Password is required`,
                    minLength: {
                      value: 6,
                      message: "Password must be a grater than 6 digit",
                    },
                  })}
                  placeholder="Password"
                />
                <InputGroup.Text
                  className="pwd-options"
                  onClick={() => handleShowPassword()}
                >
                  {showPWD ? <EyeSlashFill /> : <EyeFill />}
                </InputGroup.Text>
                <Form.Text className="err-msg">
                  {errors?.password?.message}
                </Form.Text>
              </InputGroup>
            </Form.Group>

            <ReCAPTCHA
              sitekey="6LfVtO0jAAAAAD_66KV17FhYtfgqGyI-GC0gzVkO"
              onChange={handleChangeRecaptcha}
            />

            <div>
              <Link to={"/accounts/password/reset"}>Forgot password?</Link>
            </div>
            <div className="sub-btn mt-2">
              <Button variant="light" type="submit" disabled={verified}>
                Submit <CaretRightFill className="mb-1" />
              </Button>
            </div>
          </Form>
        </div>
      </AuthenticationContainer>
    </>
  );
};
