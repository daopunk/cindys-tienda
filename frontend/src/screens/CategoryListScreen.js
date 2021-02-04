import React, { useEffect, Fragment } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Button, Table, Row, Col, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listAllProducts, createProduct, deleteProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';

const CategoryListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productListAll = useSelector((state) => state.productListAll);
  const { loading, error, products } = productListAll;

  const productCreate = useSelector((state)=> state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

  const productDelete = useSelector((state)=> state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const userLogin = useSelector((state)=> state.userLogin);
  const { userInfo } = userLogin;

  const category = (window.location.search).split('?')[1];
  const checkCategory = category.toLowerCase();

  const filteredProducts = products.filter((product) => product.category === checkCategory);

  // dispatch actions
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if(!userInfo.isAdmin) history.push('/login');
    if (successCreate) history.push(`/admin/product/${createdProduct._id}/edit`);
    else dispatch(listAllProducts());

  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteProduct(id));
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct());
  }

  const searchHeader = (
    <Nav>
    <Link to='/admin/productlist'><Button className='btn btn-light my-1 mx-1'>All</Button></Link>
    <Link to={`/admin/category?Collages`} ><Button className='btn btn-light my-1 mx-1'>Collages</Button></Link>
    <Link to={`/admin/category?Earrings`} ><Button className='btn btn-light my-1 mx-1'>Earrings</Button></Link>
    <Link to={`/admin/category?Paintings`} ><Button className='btn btn-light my-1 mx-1'>Paintings</Button></Link>
    </Nav>);

  return (
    <Fragment>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}><i className='fas fa-plus'></i>Create Product</Button>
        </Col>
      </Row>
      {searchHeader}
      {loadingDelete && <Loader />}
      {loadingCreate && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
        <Fragment>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>RATING</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product=> (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.rating}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'><i className='fas fa-edit' /></Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id, product.name)}>
                      <i className='fas fa-trash' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Fragment>
      )}
    </Fragment>
  )
}

export default CategoryListScreen