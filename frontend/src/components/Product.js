import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card className='my-4 p-1 rounded' style={{border: 'none', textAlign: 'center'}}>
      <Link to={`/product/${product._id}`}>
        <Card.Img style={{border: "1px solid #D9D0BF"}} src={product.image1} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='h2'>
            {product.name}
          </Card.Title>
        </Link>
        <Card.Text className='product-price'>
          <div>$ {product.price}.00</div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product