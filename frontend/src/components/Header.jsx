// Header.jsx
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            className="bg-body-tertiary"
            fixed="top"
            bg="dark"
            data-bs-theme="dark"
        >
            <Container>
                <Navbar.Brand
                    as={Link}
                    to="/"
                >
                    KBSW
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown
                            title="Dropdown"
                            id="collapsible-nav-dropdown"
                        >
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link
                            eventKey={1}
                            as={Link}
                            to="/admin"
                        >
                            Admin Page
                        </Nav.Link>
                        <Nav.Link
                            eventKey={2}
                            as={Link}
                            to="/mypage"
                        >
                            MyPage
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
