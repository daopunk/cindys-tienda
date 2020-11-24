import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts } from '../actions/productActions';
import SearchBox from '../components/SearchBox';

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    // makes request to the server to get products list
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      <Meta title={"Welcome to Cindy's Tienda"} />
      {!keyword ? (<ProductCarousel />) : (<Link to='/' className='btn btn-light'>Back</Link>)}
      <Nav>
        <h1>Latest Products</h1><Route render={({history})=><SearchBox history={history} />} />
      </Nav>
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
        </Fragment>)
      }
    </Fragment>
  )
}

export default HomeScreen