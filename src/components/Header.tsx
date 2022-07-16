import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { PKCEAuthorizationRedirect } from "../util/PKCEAuthorizationRedirect";

type HeaderProps = {
  name: string;
}

const Header = (props: HeaderProps) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>Minty's Graph Thing</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Navbar.Text className="pe-3">
            {props.name ? props.name: "Not signed in"}
          </Navbar.Text>
          <Button variant="outline-light" onClick={PKCEAuthorizationRedirect}>FFLogs Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;