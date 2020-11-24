import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserAdmin } from '../actions/userActions';
import { USER_UPDATE_ADMIN_RESET } from '../constants/userConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const UserEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state)=> state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateAdmin = useSelector((state)=> state.userUpdateAdmin);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateAdmin;

  useEffect(()=> {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_ADMIN_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAdmin({  _id: userId, name, email, isAdmin }));
  }

  return (
    <Fragment>
      <Link to='/admin/userlist' className='btn btn-light my-3'>Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && (<Loader />)}
        {errorUpdate && (<Message variant='danger'>{errorUpdate}</Message>)}
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
          (<Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='name' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary'>Update</Button>
          </Form>)}
      </FormContainer>
    </Fragment>
  )
}

export default UserEditScreen