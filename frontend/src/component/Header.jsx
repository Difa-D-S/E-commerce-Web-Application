import React from 'react'
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogOutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart || { cartItems: [] };
  console.log(cartItems);

  const {userInfo} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [logoutApiCall] = useLogOutMutation();

  const logoutHandler = async() =>{
    // console.log("logout");
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("login");
    } catch(error){
      console.error(error);
    }

  }

  return (
    <header>
       <Navbar bg='dark' expand="md" className="bg-body-tertiary">
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>EduCart</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
            <Nav.Link > <FaShoppingCart/> Cart
              {cartItems.length > 0 && (<Badge pill bg="success" style={{marginLeft:"5px"}}>
                {cartItems.reduce((a, c) =>{
                  let qty = Number(c.qty);
                  return a + qty; 
                }, 0)}
              </Badge>)}
            </Nav.Link>
            </LinkContainer>
           
          {
            userInfo? (
              <>
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={'/profile'}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>LogOut</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <LinkContainer to="/login">
              <Nav.Link> <FaUser/> Sign In</Nav.Link>
              </LinkContainer>
            )
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header