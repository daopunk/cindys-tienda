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
import levitate from '../images/levitate.png';

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
    <Link to='/'><Button className='btn btn-dark my-1 mx-1' onClick={()=>setKeyword('')}>All</Button></Link>
    <Link to={`/category?Collages`} ><Button className='btn btn-dark my-1 mx-1'>Collages</Button></Link>
    <Link to={`/category?Earrings`} ><Button className='btn btn-dark my-1 mx-1'>Earrings</Button></Link>
    <Link to={`/category?Paintings`} ><Button className='btn btn-dark my-1 mx-1'>Paintings</Button></Link>
    <div inline className='my-1'>
        <Form.Control inline type='text' name='q' onChange={(e)=>setKeyword(e.target.value)} 
          placeholder='Search Products...' className='mr-sm-2 ml-sm-5' style={{border:'1px solid #333'}}></Form.Control>
    </div>
    </Nav>);

  return (
    <Fragment>
      <Meta title={"Welcome to Cindita's Tiendita"} />
      <div className="main-storebanner">
        <div className='main-title-container'>
          <h1 className='main-title'>[ Cin </h1>
          <i className='fas fa-circle'/>
          <h1 className='main-title'>di</h1>
          <i className='fas fa-circle'/>
          <h1 className='main-title'>ta ]</h1>
          <h2 className='main-sub-title'><i>noun</i></h2>
        </div>
        <hr/>
        { searchHeader }
      </div>
      {!keyword && (<div className='ad-container'><ProductCarousel /></div>)}
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
        <div style={{textAlign:"center"}}>
          <Image style={{margin:"2rem 0 0 0", width:"12rem"}} src={levitate} alt="girl levitating" />
        </div>
        <div style={{margin:"3rem 0 3rem 0"}} >
          <h4 style={{margin:"1rem 0 1rem 1rem"}}>All merchandise is hand-crafted by Cindy Macias</h4>
          <hr/>
          { searchHeader }
        </div>
    </Fragment>
  )
}

export default HomeStoreScreen