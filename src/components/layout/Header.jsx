import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAllCookie } from "../../utils/Cookie";
import { BarChartFill } from "react-bootstrap-icons";
function Header({ user }) {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    clearAllCookie().then(() => {
      navigate("/accounts/signin");
    });
  };
  return (
    <Navbar expand="lg" style={{ background: "#e7e7ee", padding: "1rem" }}>
      <Container>
        <Navbar.Brand href="#home">
          MERN
          <BarChartFill />
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Dropdown>
            <Dropdown.Toggle variant="">
              <PersonCircle className="mt-auto mb-auto me-2" />
              {user.username ? (
                <span>{user.username}!</span>
              ) : (
                <Spinner animation="grow" size="sm" />
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ position: "absolute" }}>
              <Dropdown.Item href={"/accounts/signin"} onClick={handleLogOut}>
                logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
