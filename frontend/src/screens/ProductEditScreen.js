import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
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
  const [frame1, setFrame1] = useState('');
  const [frame2, setFrame2] = useState('');
  const [frame3, setFrame3] = useState('');
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
        setFrame1(product.frame1);
        setFrame2(product.frame2);
        setFrame3(product.frame3);
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
    dispatch(updateProduct({ _id: productId, name, description, price, shipping, rating, image1, image2, image3, image4, image5, category, countInStock, option1, option2, option3, option4, frame1, frame2, frame3  }));
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
              <Form.Group as={Row} controlId='name'>
                <Form.Label column sm='3'>NAME</Form.Label>
                <Col sm='9'>
                  <Form.Control type='name' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId='price'>
                <Form.Label column sm='3'>PRICE</Form.Label>
                <Col sm='9'>
                  <Form.Control type='number' placeholder='price' value={price} onChange={(e)=>setPrice(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId='shipping'>
                <Form.Label column sm='3'>SHIPPING</Form.Label>
                <Col sm='9'>
                  <Form.Control type='number' placeholder='shipping' value={shipping} onChange={(e)=>setShipping(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId='countInStock'>
                <Form.Label column sm='3'>STOCK</Form.Label>
                <Col sm='9'>
                  <Form.Control type='number' placeholder='countInStock' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId='rating'>
                <Form.Label column sm='3'>RATING</Form.Label>
                <Col sm='9'>
                  <Form.Control type='number' placeholder='rating' value={rating} onChange={(e)=>setRating(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId='category'>
                <Form.Label column sm='3'>CATEGORY</Form.Label>
                <Col sm='9'>
                  <Form.Control type='text' placeholder='category' value={category} onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId='description'>
                <Form.Label column sm='3'>DESC</Form.Label>
                <Col sm='9'>
                  <Form.Control type='text' placeholder='description' value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId='image1'>
                <Form.Label column sm='3'>IMAGE-1</Form.Label>
                <Col sm='9'>
                  <Form.Control type='text' placeholder='image1 url' value={image1} onChange={(e)=>setImage1(e.target.value)}></Form.Control>
                </Col>
                <Form.File id='image1-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <p>OPTIONS:</p>
              <Form.Group as={Row} controlId='options'>
                <Form.Label column sm='3'>O1</Form.Label>
                <Col sm='9'>
                  <Form.Control type='text' placeholder='option1' value={option1} onChange={(e)=>setOption1(e.target.value)}></Form.Control>
                </Col>
                <Form.Label column sm='3'>O2</Form.Label>
                <Col sm='9'>
                  <Form.Control type='text' placeholder='option2' value={option2} onChange={(e)=>setOption2(e.target.value)}></Form.Control>
                </Col>
                <Form.Label column sm='3'>O3</Form.Label>
                <Col sm='9'>
                  <Form.Control type='text' placeholder='option3' value={option3} onChange={(e)=>setOption3(e.target.value)}></Form.Control>
                </Col>
                <Form.Label column sm='3'>O4</Form.Label>
                <Col sm='9'>
                  <Form.Control type='text' placeholder='option4' value={option4} onChange={(e)=>setOption4(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>
              <p>FRAMES:</p>
              <Form.Group as={Row} controlId='frames'>
                <Form.Label column sm='3'>F1</Form.Label>
                <Col sm='9'>
                  <Form.Control type='text' placeholder='frame1' value={frame1} onChange={(e)=>setFrame1(e.target.value)}></Form.Control>
                </Col>
                <Form.Label column sm='3'>F2</Form.Label>
                <Col sm='9'>
                  <Form.Control type='text' placeholder='frame2' value={frame2} onChange={(e)=>setFrame2(e.target.value)}></Form.Control>
                </Col>
                <Form.Label column sm='3'>F3</Form.Label>
                <Col sm='9'>
                  <Form.Control type='text' placeholder='frame3' value={frame3} onChange={(e)=>setFrame3(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>
              <Button type='submit' variant='primary'>Update Product</Button>
            </Form>
            <hr/>
            <h2 className='my-4'>Edit Images 2 - 5</h2>
            <p>* for each additional image, an update per image must be clicked</p>
            <p>* to delete an image, delete the text and click update with an empty input</p>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='image2'>
                <Form.Control type='text' placeholder='image2 url' value={image2} onChange={(e)=>setImage2(e.target.value)}></Form.Control>
                <Form.File id='image2-file' label='Choose File' custom onChange={uploadFileHandlerTwo}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Button type='submit' variant='primary'>Update IMG-2</Button>
            </Form>
            <hr/>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='image3'>
                <Form.Control type='text' placeholder='image3 url' value={image3} onChange={(e)=>setImage3(e.target.value)}></Form.Control>
                <Form.File id='image3-file' label='Choose File' custom onChange={uploadFileHandlerThree}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Button type='submit' variant='primary'>Update IMG-3</Button>
            </Form>
            <hr/>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='image4'>
                <Form.Control type='text' placeholder='image4 url' value={image4} onChange={(e)=>setImage4(e.target.value)}></Form.Control>
                <Form.File id='image4-file' label='Choose File' custom onChange={uploadFileHandlerFour}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Button type='submit' variant='primary'>Update IMG-4</Button>
            </Form>
            <hr/>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='image5'>
                <Form.Control type='text' placeholder='image5 url' value={image5} onChange={(e)=>setImage5(e.target.value)}></Form.Control>
                <Form.File id='image5-file' label='Choose File' custom onChange={uploadFileHandlerFive}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Button type='submit' variant='primary'>Update IMG-5</Button>
            </Form>
          </Fragment>)}
      </FormContainer>
    </Fragment>
  )
}

export default ProductEditScreen