import React from 'react'
import author1 from '../assets/Images/author1.jpeg'
import author2 from '../assets/Images/author-2.jpeg'
import author3 from '../assets/Images/author-3.jpg'

// this is About Page 
const About = () => {

  const imageStyle = {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '50%'
  };

  return (
    <div className='container my-16'>
      <div className="container about-section text-center">
        <h1>About Us</h1>
        <h6>Welcome to our notes website! We are dedicated to providing the best tools and resources to help you organize and manage your notes efficiently.</h6>
      </div>

      <div className="container">
        <div className="row text-center ">
          <div className="col-md-4 team-member">
            <img src={author1} alt="Team Member 1" style={imageStyle} />
            <h5>John Doe</h5>
            <p>Founder & CEO</p>
          </div>
          <div className="col-md-4 team-member">
            <img src={author2} alt="Team Member 2" style={imageStyle}/>
            <h5>Alura- Smith</h5>
            <p>Chief Operating Officer</p>
          </div>
          <div className="col-md-4 team-member">
            <img src={author3} alt="Team Member 3"style={imageStyle} />
            <h5>Milly Johnson</h5>
            <p>Chief Technical Officer</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About
