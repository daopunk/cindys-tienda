import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center'>
            Cindita's Tiendita &copy; 2021<br/>
            <a href='https://hunterking.info/' target='_blank' rel='noreferrer' ><i>developer</i> Hunter King</a>
          </Col>

        </Row>
      </Container>
    </footer>
  )
}

export default Footer
