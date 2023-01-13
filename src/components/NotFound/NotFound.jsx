import React, { useEffect } from "react";
import NotFoundPage from "../../assets/AuthenticationImg/404-page.jpg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <div className="notfound-page">
      <img src={NotFoundPage} alt="logining" />
    </div>
  );
};

export default NotFound;
