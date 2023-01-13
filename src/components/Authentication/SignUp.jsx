import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { CaretRightFill, EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { AuthenticationContainer } from "../layout/AutheticationContainer";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import {
  closeNotification,
  loadingOn,
  openNotification,
} from "../../redux/Slice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { storeCookie } from "../../utils/Cookie";
import Cookies from "js-cookie";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let getToken = Cookies.get("token");

  const [showPWD, setShowPWD] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });
  const [verified, setVerified] = useState(true);
  const [emailErr, setEmailErr] = useState(second);

  const handleShowPassword = (textFieldName) => {
    if (textFieldName === "password") {
      setShowPWD((prev) => ({ ...prev, showPassword: !prev.showPassword }));
    } else {
      setShowPWD((prev) => ({
        ...prev,
        showConfirmPassword: !prev.showConfirmPassword,
      }));
    }
  };

  const handleChangeRecaptcha = (values) => {
    setVerified(false);
  };

  const handleOnSubmit = async (data) => {
    let { password, confirmPassword } = data;

    dispatch(loadingOn());
    const createdUser = await axios.get(`${baseUrl}/api/v1/user/${data.email}`);
    let emailAvailabel = createdUser.data?.success;
    if (emailAvailabel) {
      setEmailErr("Email alreaady exits");
    }
    if (password !== confirmPassword) {
      setConfirmPasswordErr("Password must be same");
    } else {
      try {
        setEmailErr("");
        setConfirmPasswordErr("");
        dispatch(loadingOn());
        const createdUser = await axios.post(
          `${baseUrl}/api/v1/user/register`,
          data
        );
        storeCookie(createdUser.data);
        dispatch(
          openNotification({
            message: "Sucessfully created a your account " + data.username,
          })
        );
        setTimeout(() => {
          dispatch(closeNotification());
        }, 3000);
        navigate("/");
      } catch (error) {
        console.log(error);
        dispatch(openNotification({ message: error.response?.data?.message }));
        setTimeout(() => {
          dispatch(closeNotification());
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (getToken) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <AuthenticationContainer>
        <div className="form-container">
          <Form onSubmit={handleSubmit(handleOnSubmit)}>
            <Form.Group className="mb-2" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                {...register("username", { required: `Username is required` })}
                type="text"
                placeholder="Enter username"
              />
              <Form.Text className="err-msg">
                {errors?.username?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formEmail">
              <Form.Label>Email-ID</Form.Label>
              <Form.Control
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="err-msg">
                {errors?.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formPhoneNumber">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  maxLength: {
                    value: 10,
                    message: "Phone Number must be 10 numbers",
                  },
                })}
                placeholder="Enter phone number"
              />
              <Form.Text className="err-msg">
                {errors?.phoneNumber?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPWD.showPassword ? "text" : "password"}
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
                  onClick={() => handleShowPassword("password")}
                >
                  {showPWD.showPassword ? <EyeSlashFill /> : <EyeFill />}
                </InputGroup.Text>
              </InputGroup>
              <Form.Text className="err-msg">
                {errors?.password?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formConfirmPassword">
              <Form.Label>Confirm password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPWD.showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: `Confirm Password is required`,
                    minLength: {
                      value: 6,
                      message: "Password must be a grater than 6 digit",
                    },
                  })}
                  placeholder="Confirm Password"
                />
                <InputGroup.Text
                  className="pwd-options"
                  onClick={() => handleShowPassword()}
                >
                  {showPWD.showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                </InputGroup.Text>
              </InputGroup>
              <Form.Text className="err-msg">
                {errors?.confirmPassword?.message || confirmPasswordErr}
              </Form.Text>
            </Form.Group>

            <ReCAPTCHA
              sitekey="6LfVtO0jAAAAAD_66KV17FhYtfgqGyI-GC0gzVkO"
              onChange={handleChangeRecaptcha}
            />

            <div className="sub-btn mt-2">
              <Button variant="light" type="submit">
                Submit <CaretRightFill className="mb-1" />
              </Button>
            </div>
          </Form>
        </div>
      </AuthenticationContainer>
    </>
  );
};
