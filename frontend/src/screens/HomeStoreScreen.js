import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Nav, Button, Form, Image } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts } from '../actions/productActions';
import heart_in_hand from '../images/heart_in_hand.png';

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

  const searchHeader = (
    <Nav>
    <Link to='/'><Button className='btn btn-dark my-2 mr-1' onClick={()=>setKeyword('')}>All</Button></Link>
    <Link to={`/category?Collages`} ><Button className='btn btn-dark my-2 mr-1'>Collages</Button></Link>
    <Link to={`/category?Earrings`} ><Button className='btn btn-dark my-2 mr-1'>Earrings</Button></Link>
    <Link to={`/category?Paintings`} ><Button className='btn btn-dark my-2 mr-1'>Paintings</Button></Link>
    <div className='my-2'>
        <Form.Control inline type='text' name='q' onChange={(e)=>setKeyword(e.target.value)} 
          placeholder='Search Products...' style={{width: '11.85rem',border:'1px solid #333'}}></Form.Control>
    </div>
    </Nav>);

  return (
    <Fragment>
      <Meta title={"Welcome to Cindita's Tiendita"} />
      <div>
        { searchHeader }
      </div>
      {!keyword && (<div className='ad-container'><ProductCarousel /></div>)}
      <h1>{merchandise}</h1>
      {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : 
        (<Fragment>
          <Row>
            {products.map((product) =>
            (<Col key={product._id} sm={6} md={6} lg={4} xl={3} >
              <Product product={product}/>
            </Col>)
          )}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </Fragment>)}
        <div style={{textAlign:"center"}}>
          <Image style={{ width:"10rem"}} src={heart_in_hand} alt="hand and heart" />
        </div>
        <div style={{margin:"1.5rem 0 1.5rem 0"}} >
          <h4 style={{margin:"0 0 1rem .5rem"}}>all merchandise is hand-crafted by cindy macias</h4>
          <hr/>
          { searchHeader }
        </div>
    </Fragment>
  )
}

export default HomeStoreScreen