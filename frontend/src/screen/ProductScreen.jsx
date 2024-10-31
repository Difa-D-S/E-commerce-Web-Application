import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import products from "../../../backend/data/products.js";
import {
  Col,
  Row,
  Image,
  Card,
  Button,
  ListGroup,
  Form
} from "react-bootstrap";
import Rating from "../component/Rating.jsx";
// import axios from "axios";
import { useGetProductsDetailsQuery } from "../slices/productApiSlice.js";
import Loader from "../component/Loader.jsx";
import Message from "../component/Message.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice.js";

const ProductScreen = () => {
  // const [product, setProduct] = useState({})
    
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {data: product, isLoading, error } = useGetProductsDetailsQuery(productId);

  const addToCartHandler = () =>{
    dispatch(addToCart({...product, qty }));
    navigate("/cart")
  }

  // useEffect( () => {
  //   const fetchProduct = async () =>{
  //     const {data} = await axios.get(`/api/products/${productId}`);
  //     setProduct(data);
  //   }
  //   fetchProduct();
  // }, [productId])

  // const product = products.find((p) => p._id === productId);
  // console.log(product);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {/* <Message variant="success">Hellow</Message> */}
    {isLoading ? (<Loader />) : error ? (<Message variant="danger">{error?.data.message || error.error}</Message>) : (
      <>
        <Row>
      <Col md={5}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>

      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h1>{product.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </ListGroup.Item>

          <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
          <ListGroup.Item>Description : {product.description}</ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={3}>
          <Card>
              <ListGroup variant='flush'>
                 <ListGroup.Item>
                      <Row>
                          <Col>Price: </Col>
                          <Col><strong>${product.price}</strong></Col>
                      </Row>
                 </ListGroup.Item>

                 <ListGroup.Item>
                      <Row>
                          <Col>Status: </Col>
                          <Col>
                              {product.countInStock > 0 ? "InStock" : "Out of stock"}
                          </Col>
                      </Row>
                 </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Form.Control as="select" value={qty}
                        onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => {
                            return <option key={x+1} value={x+1}>
                              {x+1}
                            </option>
                          })}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                 <ListGroup.Item>
                  <Button className="btn-block" type='button' disabled={product.countInstock === 0 }
                    onClick={addToCartHandler}>Add to Cart</Button>
                 </ListGroup.Item>

              </ListGroup>
          </Card>
      </Col>
    </Row>
      </>
    )}
    </>
  )}

export default ProductScreen;
