import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import FormContainer from '../components/FormContainer';

const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [featureImage, setFeatureImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state)=> state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state)=> state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(()=> {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setFeatureImage(product.featureImage);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, product, history, successUpdate]);

  const refreshPage = () => {
    window.location.reload(true);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: productId, name, description, price, image, category, countInStock }));
    dispatch(listProductDetails(productId));
    refreshPage();
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  }

  return (
    <Fragment>
      <Meta />
      <Link to='/admin/productlist' className='btn btn-light my-3'>Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
          (<Fragment>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control type='number' placeholder='price' value={price} onChange={(e)=>setPrice(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control type='text' placeholder='image url' value={image} onChange={(e)=>setImage(e.target.value)}></Form.Control>
                <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control type='text' placeholder='category' value={category} onChange={(e)=>setCategory(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='countInStock'>
                <Form.Label>Count in Stock</Form.Label>
                <Form.Control type='number' placeholder='countInStock' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='description' value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary'>Update</Button>
            </Form>
            <h2 className='my-4'>Edit Feature Image</h2>
            <Form>
              <Form.Group controlId='featureImage'>
                <Form.Label>Feature Image</Form.Label>
                <Form.Control type='text' placeholder='featureImage url' value={featureImage} onChange={(e)=>setFeatureImage(e.target.value)}></Form.Control>
                <Form.File id='featureImage-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Button type='submit' variant='primary'>Update</Button>
            </Form>
          </Fragment>)}
      </FormContainer>
    </Fragment>
  )
}

export default ProductEditScreen