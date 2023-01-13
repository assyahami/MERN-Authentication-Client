import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { AuthenticationContainer } from "../layout/AutheticationContainer";
import { CaretRightFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeNotification, openNotification } from "../../redux/Slice";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import Cookies from "js-cookie";

const SendEmail = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let getToken = Cookies.get("token");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/user/password/forgot`,
        { email: email }
      );
      dispatch(
        openNotification({
          message: data.message,
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
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email-ID</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="ms-2">{errors}</Form.Text>
            </Form.Group>

            <div className="reset-sub-btn">
              <Button variant="light" disabled={email.length < 1} type="submit">
                Send login link
              </Button>
            </div>
          </Form>
        </div>
      </AuthenticationContainer>
    </>
  );
};

export default SendEmail;
