import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../component/Product.jsx';
// import axios from "axios";
import { useGetProductsQuery } from '../slices/productApiSlice.js';
import Loader from '../component/Loader.jsx';
import Message from '../component/Message.jsx';

const HomeScreen = () => {

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () =>{
  //     const {data} = await axios.get("/api/products");
  //     // console.log(data);
  //     setProducts(data);
  //   }

  //   fetchProducts();
  // }, []);

  const {data:products, isLoading, error} = useGetProductsQuery();

  return (
    <>
     {isLoading ? (<Loader/>) : error ? (<Message variant="danger">{error?.data.message || error.error}</Message>) : (<>
      <h1>Latest Products</h1>

      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          )
        })}
      </Row>
      </>
      )}
    </>
  )}

export default HomeScreen;