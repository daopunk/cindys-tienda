import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTop = useSelector((state) => state.productTop);

  const { loading, error, products } = productTop;

  useEffect(()=> {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
  (<Carousel pause='hover' className='bg-light' >
    {products.map((product)=> 
      (<Carousel.Item key={product._id}>
        <Link to={`/product/${product._id}`}>
        <div className='ad-carousel-desc-container'>
          <h1 className='ad-h1'>{product.name}</h1>
          <p className='ad-p'>{product.description}</p>
          <h2 className='ad-h2'>${product.price}</h2>
        </div>
        </Link>
        <Link to={`/product/${product._id}`}>
          <Image className='ad-carousel-img' src={product.image1} alt={product.name} />
        </Link>
      </Carousel.Item>)
    )}
  </Carousel>)
}

export default ProductCarousel
