import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { ORDER_LIST_RESET } from '../constants/orderConstants';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(()=>{
    if(productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
    dispatch({ type: ORDER_LIST_RESET });
    window.location.reload(true);
  }

  
  return (
    <Row>
      <Meta />
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Cart is empty  |<Link to='/tienda' style={{color: "#000000"}}><strong>Back</strong></Link></Message> : 
        (<ListGroup variant='flush'>
          {cartItems.map(item => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  <Form.Control as='select' value={item.qty} onChange={(e)=>dispatch(addToCart(item.product, Number(e.target.value)))}>
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x+1} value={x+1}>{x+1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}>
                    <i className='fas fa-trash'/>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>)}
      </Col>
      <Col md={4}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Subtotal ({cartItems.reduce((acc,cur)=> acc+cur.qty, 0)}) items</h2>
            ${cartItems.reduce((acc,cur)=> acc+cur.qty * cur.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to={`/tienda`}><Button type='button' className='btn-block'>Continue Shopping</Button></Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' 
                disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</Button>
            </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  )
}

export default CartScreen

