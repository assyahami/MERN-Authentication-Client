import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import cookie from "js-cookie";
import axios from "axios";
import { openNotification } from "../../redux/Slice";
import baseUrl from "../../utils/baseUrl";

export const Home = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  let userID = cookie.get("user_id");

  const handleFetchUser = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/user/${userID}`);
      setUser(data.user);
    } catch (error) {
      dispatch(openNotification({ message: error.response.data.message }));
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  return (
    <div>
      <Header user={user} />
      <section>
        <div className="home-container">
          <Card style={{ width: "25rem" }} className="mt-4">
            <Card.Body>
              <Card.Title>Hello {user?.username}!</Card.Title>
              <Card.Text>
                Don't worry,we are secured your a details. To show our happiness
                at having you here,
              </Card.Text>
              <Button variant="light">Feedback</Button>
            </Card.Body>
          </Card>
        </div>
      </section>
    </div>
  );
};
