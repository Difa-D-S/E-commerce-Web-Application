import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import FormContainer from '../component/FormContainer';
import {Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckOutSteps from '../component/CheckOutSteps';

const ShippingScreen = () => {

    
  const cart = useSelector((state) => state.cart);
  const { ShippingAddress } = cart;

    const [address, setAddress] = useState(ShippingAddress?.address || '');
  const [city, setCity] = useState(ShippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(ShippingAddress?.postalCode || '');
  const [country, setCountry] = useState(ShippingAddress?.country || '');

  const navigate = useNavigate();
  const dispatch = useDispatch();


    const submitHandler = async(e) =>{
        e.preventDefault();
        // console.log("submit");
        dispatch(saveShippingAddress({ address, city, postalCode, country}))
        navigate('/payment');
    };

  return (
    <>
    <FormContainer>

    <CheckOutSteps step1 step2 step3 step4/>
        
        <h1>Shipping</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group className = "my-2" controlId = "email">
                <Form.Label>Address</Form.Label>

                <Form.Control
                    type= "text"
                    placeholder="Enter Addresso"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group className = "my-2" controlId = "email">
                <Form.Label>City</Form.Label>

                <Form.Control
                    type= "text"
                    placeholder="Enter City"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group className = "my-2" controlId = "password">
                <Form.Label>PostalCode</Form.Label>

                <Form.Control
                    type= "text"
                    placeholder="Enter PostalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group className = "my-2" controlId = "email">
                <Form.Label>Country</Form.Label>

                <Form.Control
                    type= "text"
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
                Continue
            </Button>
        </Form>
    </FormContainer>
    
    </>
  );
};

export default ShippingScreen;