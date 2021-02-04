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
  const [shipping, setShipping] = useState(0);
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state)=> state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state)=> state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(()=> {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setShipping(product.shipping);
        setImage1(product.image1);
        setImage2(product.image2);
        setImage3(product.image3);
        setImage4(product.image4);
        setImage5(product.image5);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setRating(product.rating);
        setOption1(product.option1);
        setOption2(product.option2);
        setOption3(product.option3);
        setOption4(product.option4);
      }
    }
  }, [dispatch, productId, product, history, successUpdate]);

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: productId, name, description, price, shipping, rating, image1, image2, image3, image4, image5, category, countInStock, option1, option2, option3, option4  }));
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

      setImage1(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  }

  const uploadFileHandlerTwo = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const { data } = await axios.post('/api/upload', formData, config);

      setImage2(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  }

  const uploadFileHandlerThree = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const { data } = await axios.post('/api/upload', formData, config);

      setImage3(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  }

  const uploadFileHandlerFour = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const { data } = await axios.post('/api/upload', formData, config);

      setImage4(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  }

  const uploadFileHandlerFive = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const { data } = await axios.post('/api/upload', formData, config);

      setImage5(data);
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
              <Form.Group controlId='shipping'>
                <Form.Label>Shipping Charge</Form.Label>
                <Form.Control type='number' placeholder='shipping' value={shipping} onChange={(e)=>setShipping(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='image1'>
                <Form.Label>Image 1</Form.Label>
                <Form.Control type='text' placeholder='image1 url' value={image1} onChange={(e)=>setImage1(e.target.value)}></Form.Control>
                <Form.File id='image1-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
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
              <Form.Group controlId='rating'>
                <Form.Label>Rating</Form.Label>
                <Form.Control type='number' placeholder='rating' value={rating} onChange={(e)=>setRating(e.target.value)}></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary'>Update</Button>
            </Form>
            <hr/>
            <p>* Note:<br/>
              To add options (e.g. red, blue, green), simply type in the option text box, up to four options. Then click the corresponding blue "Update" button.
            </p>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='option1'>
                <Form.Label>Option 1</Form.Label>
                <Form.Control type='text' placeholder='option1' value={option1} onChange={(e)=>setOption1(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='option2'>
                <Form.Label>Option 2</Form.Label>
                <Form.Control type='text' placeholder='option2' value={option2} onChange={(e)=>setOption2(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='option3'>
                <Form.Label>Option 3</Form.Label>
                <Form.Control type='text' placeholder='option3' value={option3} onChange={(e)=>setOption3(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='option4'>
                <Form.Label>Option 4</Form.Label>
                <Form.Control type='text' placeholder='option4' value={option4} onChange={(e)=>setOption4(e.target.value)}></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary'>Update</Button>
            </Form>
            <hr/>
            <p>* Note:<br/>
              To upload additional images, click "Browse" to choose an image, then click the corresponding blue "Update" button to complete upload. This must be done for each addtional image uploaded.
            </p>
            <h2 className='my-4'>Edit Image</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='image2'>
                <Form.Label>Image 2</Form.Label>
                <Form.Control type='text' placeholder='image2 url' value={image2} onChange={(e)=>setImage2(e.target.value)}></Form.Control>
                <Form.File id='image2-file' label='Choose File' custom onChange={uploadFileHandlerTwo}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Button type='submit' variant='primary'>Update Image</Button>
            </Form>
            <hr/>
            <h2 className='my-4'>Edit Image 3</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='image3'>
                <Form.Label>Image 3</Form.Label>
                <Form.Control type='text' placeholder='image3 url' value={image3} onChange={(e)=>setImage3(e.target.value)}></Form.Control>
                <Form.File id='image3-file' label='Choose File' custom onChange={uploadFileHandlerThree}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Button type='submit' variant='primary'>Update Image</Button>
            </Form>
            <hr/>
            <h2 className='my-4'>Edit Image 4</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='image4'>
                <Form.Label>Image 4</Form.Label>
                <Form.Control type='text' placeholder='image4 url' value={image4} onChange={(e)=>setImage4(e.target.value)}></Form.Control>
                <Form.File id='image4-file' label='Choose File' custom onChange={uploadFileHandlerFour}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Button type='submit' variant='primary'>Update Image</Button>
            </Form>
            <hr/>
            <h2 className='my-4'>Edit Image 5</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='image5'>
                <Form.Label>Image 5</Form.Label>
                <Form.Control type='text' placeholder='image5 url' value={image5} onChange={(e)=>setImage5(e.target.value)}></Form.Control>
                <Form.File id='image5-file' label='Choose File' custom onChange={uploadFileHandlerFive}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Button type='submit' variant='primary'>Update Image</Button>
            </Form>
          </Fragment>)}
      </FormContainer>
    </Fragment>
  )
}

export default ProductEditScreen