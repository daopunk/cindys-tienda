import React, { Fragment } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fireMoon from '../images/fireMoon.png';
import cindyBby from '../images/cindyBby.png';

const AboutScreen = () => {

  const mobileStyle1 = {
    height: '15rem',
    margin: 'auto',
    paddingBottom: '1.5rem'
  }

  const mobileStyle2 = {
    height: '14rem',
    margin: 'auto',
    paddingBottom: '1.5rem'
  }

  return (
    <Fragment>
      <div className="about-sections">
        <div className="about-texts">
          <div className="main-storebanner">
            <div className='main-title-container'>
              <h1 className='main-title'>[ cin </h1>
              <i className='fas fa-circle'/>
              <h1 className='main-title'>di</h1>
              <i className='fas fa-circle'/>
              <h1 className='main-title'>ta ]</h1>
            </div>
          </div>
          <div className="row about-section">
            <div className="col-12 col-sm-7">
              <p>cindita is a nickname that my parents would use para regañarme cuando hacía cochinero en la sala. they would scold me for having a mess on the living room floor while I was creating. while it used to make me feel guilty about taking up space, I’ve chosen to reclaim that name, which was once diminutive and limiting, as a newfound source of inspiration. 
              <br/><br/>to reclaim that nickname, for the shop and beyond, means to frame art, creativity and imagination not simply as forms of self-expression, but as a means for survival. cindita is a reference to the ways in which I’ve been drawn to creativity to resist, survive, and thrive. it acknowledges that, like childhood, life is full of discovery, disappointments, mistakes and triumphs.
              </p>
            </div>
            <div className="col about-pic-sec-1"></div>
          </div>
          <hr className="not-mobile-sec"/>
          <div className="row about-section mobile-sec" style={{paddingLeft:'2.5rem'}}>
          <Image src={cindyBby} style={mobileStyle1} alt='Cindy as a child' />
          <Image src={fireMoon} style={mobileStyle2} alt='Fire Moon' />
          </div>
          <div className="row about-section">
            <div className="col about-pic-sec-3"></div>
            <div className="col-12 col-sm-7">
              <p>i use art, imagination, and creativity as part of a ritual for self-care which allows me to explore my thoughts and help me process difficult, often deeply repressed emotions. my creations become tangible proof of my love for the process of healing, growing, and learning. they are meant to honor and adorn the places and spaces we inhabit. 
              <br/><br/>i want you to experience that bubbling joy of putting up new artwork on your wall or popping on a new pair of earrings. i want folks to frame the exchange beyond the material, as an offering that calls for us to honor one another.
              </p>
            </div>
          </div>
        </div>
        <hr/>
        <h4 style={{textAlign:'center'}}>my offerings</h4>
        <div className="row about-icons">
          <div className="col">
            <Link to={`/category?Collages`} >
              <div className='about-icon-1'></div>
            </Link>
          </div>
          <div className="col">
            <Link to={`/category?Earrings`} >
              <div className='about-icon-2'></div>
            </Link>
          </div>
          <div className="col">
            <Link to={`/category?Paintings`} >
              <div className='about-icon-3'></div>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default AboutScreen

{/* 
const logoStyle = {height: '4rem'}
  
<div>
<h1 style={{textAlign:'center',margin:'1.5rem',fontSize:'2.5rem'}}>
<Image src={fireMoon} style={logoStyle} alt='Fire Moon' />
welcome to cindita's tienda</h1>
<hr/>
</div> 
*/}