import React, { useEffect, Fragment } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listAllOrders } from '../actions/orderActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  // get userList from store 
  const orderListAll = useSelector((state)=> state.orderListAll);
  const { loading, error, orders } = orderListAll;

  const userLogin = useSelector((state)=> state.userLogin);
  const { userInfo } = userLogin;

  // dispatch actions
  useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <Fragment>
      <Meta />
      <h1>Orders</h1>
      {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ORDER</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>SHIPPED</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {orders.reverse().map((order)=> (
              <tr key={order._id}>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>Details</Button>
                  </LinkContainer>
                </td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                  <i className='fas fa-times' style={{color: '#FF0000'}}></i>
                )}</td>
                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                  <i className='fas fa-times' style={{color: '#FF0000'}}></i>
                )}</td>
                <td>{order._id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  )
}

export default OrderListScreen