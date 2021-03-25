import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form, Carousel, Dropdown, DropdownButton } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { listProductDetails } from '../actions/productActions';

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;

  const [qty, setQty] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFrame, setSelectedFrame] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  const url = (!selectedOption && !selectedFrame) ? `/cart/${productId}?qty=${qty}` :
  (selectedOption && !selectedFrame) ? `/cart/${productId}?qty=${qty}&option=${selectedOption}` :
  (!selectedOption && selectedFrame) ? `/cart/${productId}?qty=${qty}&frame=${selectedFrame}` :
  `/cart/${productId}?qty=${qty}&option=${selectedOption}&frame=${selectedFrame}`;

  const addToCartHandler = () => {
    history.push(url)
  }

  const handleOptionSelect=(e)=>{
    setSelectedOption(e);
  }

  const handleFrameSelect=(e)=>{
    setSelectedFrame(e);
  }

  return (
    <Fragment>
      <Link className='btn btn-light my-3' to='/'>Back</Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Fragment>
        <Row>
          <Meta title={product.name} />
          <Col xs={12} sm={8} md={8} lg={8} className='product-carousel' >
          <Carousel pause='hover' className='bg-light'>
            <Carousel.Item key={product._id}>
              <Image className="details-carousel-img" src={product.image1} alt={product.name} fluid />
            </Carousel.Item>
            {product.image2 &&
            <Carousel.Item key={product._id}>
                <Image className="details-carousel-img" src={product.image2} alt={product.name} fluid />
            </Carousel.Item>}
            {product.image3 &&
            <Carousel.Item key={product._id}>
                <Image className="details-carousel-img" src={product.image3} alt={product.name} fluid />
            </Carousel.Item>}
            {product.image4 &&
            <Carousel.Item key={product._id}>
                <Image className="details-carousel-img" src={product.image4} alt={product.name} fluid />
            </Carousel.Item>}
            {product.image5 &&
            <Carousel.Item key={product._id}>
                <Image className="details-carousel-img" src={product.image5} alt={product.name} fluid />
            </Carousel.Item>}
          </Carousel>
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col><strong>${product.price}</strong></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>{x+1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button onClick={addToCartHandler} className='btn-block' type='button' 
                  disabled={product.countInStock === 0 || (product.option1 && !selectedOption) || (product.frame1 && !selectedFrame)} >Add To Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={8} md={8} lg={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Category: </strong>{product.category}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price: </strong>${product.price}
              </ListGroup.Item>
              {product.description && (<ListGroup.Item>
                <strong>Description: </strong><br/>{product.description}
              </ListGroup.Item>)}
            </ListGroup>
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            {product.option1 && (
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <DropdownButton alignRight title="Options" id="dropdown-menu-align-right" onSelect={(e) => handleOptionSelect(e)}>
                    <Dropdown.Item eventKey={product.option1}>{product.option1}</Dropdown.Item>
                    <Dropdown.Item eventKey={product.option2}>{product.option2}</Dropdown.Item>
                    {product.option3 && <Dropdown.Item eventKey={product.option3}>{product.option3}</Dropdown.Item>}
                    {product.option4 && <Dropdown.Item eventKey={product.option4}>{product.option4}</Dropdown.Item>}
                  </DropdownButton>
                  Option: <strong>{selectedOption ? selectedOption : 'not selected'}</strong>
                </ListGroup.Item>
              </ListGroup>
            )}
            {product.frame1 && (
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <DropdownButton alignRight title="Options" id="dropdown-menu-align-right" onSelect={(e) => handleFrameSelect(e)}>
                    <Dropdown.Item eventKey={product.frame1}>{product.frame1}</Dropdown.Item>
                    <Dropdown.Item eventKey={product.frame2}>{product.frame2}</Dropdown.Item>
                    {product.frame3 && <Dropdown.Item eventKey={product.frame3}>{product.frame3}</Dropdown.Item>}
                    {product.frame4 && <Dropdown.Item eventKey={product.frame4}>{product.frame4}</Dropdown.Item>}
                  </DropdownButton>
                  Frame: <strong>{selectedFrame ? selectedFrame : 'not selected'}</strong>
                </ListGroup.Item>
              </ListGroup>
            )}
          </Col>
        </Row>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductScreen