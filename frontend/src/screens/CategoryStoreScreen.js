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

  const searchHeader = (
    <Nav>
      <Link to='/' ><Button className='btn btn-dark my-3 mx-1'>All</Button></Link>
      <Link to={`/category?Collages`} ><Button className='btn btn-dark my-3 mx-1'>Collages</Button></Link>
      <Link to={`/category?Earrings`} ><Button className='btn btn-dark my-3 mx-1'>Earrings</Button></Link>
      <Link to={`/category?Paintings`} ><Button className='btn btn-dark my-3 mx-1'>Paintings</Button></Link>
    </Nav>);

  return (
    <Fragment>
      <Meta title={"Welcome to Cindy's Tienda"} />
      { searchHeader }
      <hr/>
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
      <div style={{margin:"3rem 0 3rem 0"}} >
          <h4 style={{margin:"1rem 0 1rem 1rem"}}>All merchandise is hand-crafted by Cindy Macias</h4>
          <hr/>
          { searchHeader }
      </div>
    </Fragment>
  )
}

export default CategoryStoreScreen