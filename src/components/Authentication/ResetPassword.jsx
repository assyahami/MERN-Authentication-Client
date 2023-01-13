import React, { useState, useEffect } from "react";
import { AuthenticationContainer } from "../layout/AutheticationContainer";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CaretRightFill, EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import { closeNotification, loadingOn, openNotification } from "../../redux/Slice";
import { useDispatch } from "react-redux";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { storeCookie } from "../../utils/Cookie";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const { token } = useParams();
  const [showPWD, setShowPWD] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleOnSubmit = async (data) => {
    let { password, newConfirmPassword } = data;

    if (password !== newConfirmPassword) {
      setConfirmPasswordErr("Password must be same");
    } else {
        try {
      dispatch(loadingOn());
        const changeUserPassword = await axios.post(
          `${baseUrl}/api/v1/user/password/reset/${token}`,
          data
        );
        storeCookie(changeUserPassword.data);
        dispatch(
          openNotification({
            message: "Your password has been changed successfully",
          })
        );
        setTimeout(() => {
          dispatch(closeNotification());
        }, 3000);
      } catch (error) {
        dispatch(openNotification({ message: error.response.data.message }));
        setTimeout(() => {
          dispatch(closeNotification());
        }, 3000);
      }
      setConfirmPasswordErr("");
      navigate("/");
    }
  };

  return (
    <>
      <AuthenticationContainer>
        <div className="form-container-signin">
          <Form onSubmit={handleSubmit(handleOnSubmit)}>
            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPWD.showPassword ? "text" : "password"}
                  {...register("password", {
                    required: `New Password is required`,
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
              <Form.Text className="ms-2">
                {errors?.password?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formConfirmPassword">
              <Form.Label>New Confrim Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPWD.showConfirmPassword ? "text" : "password"}
                  {...register("newConfirmPassword", {
                    required: `New confrim password  is required`,
                    minLength: {
                      value: 6,
                      message: "Password must be a grater than 6 digit",
                    },
                  })}
                  placeholder="New confrim password "
                />
                <InputGroup.Text
                  className="pwd-options"
                  onClick={() => handleShowPassword()}
                >
                  {showPWD.showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                </InputGroup.Text>
              </InputGroup>
              <Form.Text className="ms-2">
                {errors?.newConfirmPassword?.message || confirmPasswordErr}
              </Form.Text>
            </Form.Group>
            <div className="reset-sub-btn">
              <Button variant="light" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </AuthenticationContainer>
    </>
  );
};

export default ResetPassword;
