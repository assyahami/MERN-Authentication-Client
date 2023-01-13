import { useState } from "react";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { SignUp } from "./components/Authentication/SignUp";
import { SignIn } from "./components/Authentication/SignIn";
import NotFound from "./components/NotFound/NotFound";
import SendEmail from "./components/Authentication/SendEmail";
import ResetPassword from "./components/Authentication/ResetPassword";
import Notification from "./components/Notification/Notification";
import PrivateRoute from "./utils/PrivateRouter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Notification />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route exact path="/accounts/signup" element={<SignUp />} />
        <Route exact path="/accounts/signin" element={<SignIn />} />
        <Route exact path="/accounts/password/reset" element={<SendEmail />} />
        <Route
          exact
          path="/accounts/password/change/:token"
          element={<ResetPassword />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
