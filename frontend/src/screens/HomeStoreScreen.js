import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Nav, Button, Form } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts } from '../actions/productActions';

const HomeStoreScreen = ({ match }) => {
  const dispatch = useDispatch();

  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const [keyword, setKeyword] = useState('');

  const merchandise = keyword ? keyword : 'All Merchandise';

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      <Meta title={"Welcome to Cindy's Tienda"} />
      <Nav>
        <Link to='/tienda' ><Button className='btn btn-light my-3 mx-1' onClick={()=>setKeyword('')}>All</Button></Link>
        <Link to={`/tienda/category?Paintings`} ><Button className='btn btn-light my-3 mx-1'>Paintings</Button></Link>
        <Link to={`/tienda/category?Collages`} ><Button className='btn btn-light my-3 mx-1'>Collages</Button></Link>
        <Link to={`/tienda/category?Earrings`} ><Button className='btn btn-light my-3 mx-1'>Earrings</Button></Link>
        <div inline className='my-3'>
            <Form.Control inline type='text' name='q' onChange={(e)=>setKeyword(e.target.value)} 
              placeholder='Search Products...' className='mr-sm-2 ml-sm-5'></Form.Control>
        </div>
      </Nav> 
      {!keyword && (<ProductCarousel />)}
      <h1>{merchandise}</h1>
      {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : 
        (<Fragment>
          <Row>
            {products.map((product) =>
            (<Col key={product._id} sm={12} md={6} lg={4}  xl={3}>
              <Product product={product}/>
            </Col>)
          )}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </Fragment>)}
    </Fragment>
  )
}

export default HomeStoreScreen