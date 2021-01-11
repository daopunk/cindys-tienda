import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Cindita's Tiendita &copy; 2021  |
            <a href='https://hunterking.info/' target='_blank' >  Designed by Hunter King</a>
          </Col>

        </Row>
      </Container>
    </footer>
  )
}

export default Footer
