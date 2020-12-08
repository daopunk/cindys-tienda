import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Cindy's Tienda &copy; 2020  |
            <a href='https://hunterking.info/' target='_blank' >  Designed by Hunter</a>
          </Col>

        </Row>
      </Container>
    </footer>
  )
}

export default Footer
