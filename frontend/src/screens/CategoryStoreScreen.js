import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Nav, Button } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { listAllProducts } from '../actions/productActions';

const CategoryStoreScreen = () => {
  const dispatch = useDispatch();

  const productListAll = useSelector((state) => state.productListAll);
  const { loading, error, products } = productListAll;

  const category = (window.location.search).split('?')[1];
  const checkCategory = category.toLowerCase();

  const filteredProducts = products.filter((product) => product.category === checkCategory);

  useEffect(() => {
    dispatch(listAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <Meta title={"Welcome to Cindy's Tienda"} />
      <Nav>
        <Link to='/tienda' ><Button className='btn btn-light my-3 mx-1'>All</Button></Link>
        <Link to={`/tienda/category?Collages`} ><Button className='btn btn-light my-3 mx-1'>Collages</Button></Link>
        <Link to={`/tienda/category?Earrings`} ><Button className='btn btn-light my-3 mx-1'>Earrings</Button></Link>
        <Link to={`/tienda/category?Paintings`} ><Button className='btn btn-light my-3 mx-1'>Paintings</Button></Link>
      </Nav> 
      <Fragment>
        <h1>{category}</h1>
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
          (<Row>
            {filteredProducts.map((product)=>
            (<Col key={product._id} sm={12} md={6} lg={4}  xl={3}>
              <Product product={product}/>
            </Col>)
          )}
          </Row>)}
      </Fragment>
    </Fragment>
  )
}

export default CategoryStoreScreen