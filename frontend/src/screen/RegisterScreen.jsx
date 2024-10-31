import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import FormContainer from '../component/FormContainer';
import {Form, Button, Row, Col} from "react-bootstrap";
import { useRegisterMutation } from '../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import Loader from '../component/Loader';

const Register = () => {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const {search} = useLocation();
//   console.log(search);

    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);


    const submitHandler = async(e) =>{
        e.preventDefault();
        // console.log("submit");

        if(password !== confirmPassword){
            // toast.error("Passwords do no match");
            console.log('incorect')
        }else{
            try{
                const res = await register({name, password, email}).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            }catch(error) {
                // toast.error(error?.data?.message || error.message);
            }
        }
    };

  return (
    <>
    <FormContainer>
        <h1>Register</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group className = "my-2" controlId = "email">
                <Form.Label>Name</Form.Label>

                <Form.Control
                    type= "name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group className = "my-2" controlId = "email">
                <Form.Label>Email Address</Form.Label>

                <Form.Control
                    type= "email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group className = "my-2" controlId = "password">
                <Form.Label>Password</Form.Label>

                <Form.Control
                    type= "password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group className = "my-2" controlId = "email">
                <Form.Label>Confirm Password</Form.Label>

                <Form.Control
                    type= "password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type="submit" disabled={isLoading} variant="primary">
                Sign In
            </Button>
            {isLoading && <Loader />}
        </Form>

        <Row className='py-3'>
            <Col>
                Already have an account?('')
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
    
    </>
  );
};

export default Register;