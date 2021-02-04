import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const AboutScreen = () => {
  return (
    <Fragment>
      <div className="main-storebanner">
        <div className='main-title-container'>
          <h1 className='main-title'>[ Cin </h1>
          <i className='fas fa-circle'/>
          <h1 className='main-title'>di</h1>
          <i className='fas fa-circle'/>
          <h1 className='main-title'>ta ]</h1>
          <h2 className='main-sub-title'><i>noun</i></h2>
        </div>
        <hr/>
      </div>
      <div className="about-sections">
        <div className="about-texts">
          <div className="row about-section">
            <div className="col about-pic-sec-1"></div>
            <div className="col-7">
              <p>Cindita is a nickname that my parents would use para regañarme cuando hacía cochinero en la sala. They would scold me for having a mess on the living room floor while I was creating.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
          <hr/>
          <div className="row about-section">
            <div className="col-7">
              <p>To reclaim my nickname, for the shop and beyond, means to frame art, creativity and imagination not simply as forms of self-expression, but as a means for survival.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
            <div className="col about-pic-sec-2"></div>
          </div>
          <hr/>
          <div className="row about-section">
            <div className="col about-pic-sec-3"></div>
            <div className="col-7">
              <p>Cindita is reference to the ways in which I’ve been drawn to creativity to resist, survive, and thrive. It acknowledges that 2020, like childhood, was full of discovery, disappointments, mistakes and triumphs. I am inspired by the ingenuity of folks, lessons from childhood, and the children in my life.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
        <hr/>
        <h4 style={{textAlign:'center'}}>Cindita's Offerings</h4>
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
