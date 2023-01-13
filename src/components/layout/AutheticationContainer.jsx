import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CaretRightFill,
  Instagram,
  Facebook,
  Whatsapp,
  Twitter,
  Linkedin,
} from "react-bootstrap-icons";
import sunrise_overBeach from "../../assets/AuthenticationImg/login-page.jpg";

export const AuthenticationContainer = (props) => {
  let webPath = useLocation();
  let getPath = webPath.pathname;
  let isSignin = getPath === "/accounts/signin";
  return (
    <section className="signup-container">
      <main className="main-container">
        <div className="img-container">
          <img src={sunrise_overBeach} alt="loading..." />
          <div className="user-options">
            <div className="route-signin">
              <h4>
                {isSignin ? "Don't Have an Account" : "Have an Account"} ?
              </h4>
              <Link to={isSignin ? "/accounts/signup" : "/accounts/signin"}>
                {isSignin ? "Sign up" : "Sign in"}
              </Link>
            </div>
            <div className="companies-medias">
              <h6>Follow us:</h6>
              <div className="social-media">
                <Instagram />
                <Facebook />
                <Linkedin />
                <Whatsapp />
                <Twitter />
              </div>
            </div>
          </div>
        </div>
        {props.children}
      </main>
    </section>
  );
};
