import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import cinditaBackground from '../images/cinditaBackground.png';
import cindyBby from '../images/cindyBby.png';
import cindyAdult from '../images/cindyAdult.png';

const HomeScreen = () => {
  return (
    <div>
      <Link to='/tienda' >
        <Image className='mainBackground' src={cinditaBackground} alt='background image'/>
      </Link>
      <div className='main-title-container'>
        <h1 className='main-title'>[ Cin </h1>
        <i className='fas fa-circle'/>
        <h1 className='main-title'>di</h1>
        <i className='fas fa-circle'/>
        <h1 className='main-title'>ta ]</h1>
        <h2 className='main-sub-title'><i>noun</i></h2>
      </div>
      <div className='main-bio-container'>
        <Image className='main-bbypic' src={cindyBby} alt='Baby Cindy' />
        <Image className='main-adultPic' src={cindyAdult} alt='Adult Cindy' />
      </div>
      <p className='main-bio'>
        Since childhood, I’ve been drawn to creativity to resist, survive, and thrive. This year, like childhood, has been full of discovery, disappointments, mistakes & triumphs, so I think of art, creativity & imagination not simply as forms of self-expression, but as a means for survival. I am inspired by the ingenuity of folks, lessons from childhood, and the children in my life.
        <Link to='/tienda' ><h5 className='shop'>Check Out the Tienda</h5></Link>
      </p>
      
    </div>
  )
}

export default HomeScreen
