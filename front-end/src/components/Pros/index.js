import React from 'react'
import './style.css'
import first from '../firstimg.jpg'
import second from '../interviewsecond.jpg'
import third from '../emothird.jpg'
export default function Pros() {
  return (
    <div>
      <h2 className='discoverheading'>Discover The Future</h2>
    <div className='flexbox'>
      
        <div className='flexbox-one'>
          <img src={first} alt="Assesment by AI" className='assimg'/>
            Welcome to the world of AI-driven job interviews, where stress and bias don't stand a chance. Immerse yourself in the perks of cutting-edge technology as it streamlines the hiring process.
        </div>
        <div className='flexbox-two'>
        <img src={second} alt="Interview by AI" className='interimg'/>
            Harness cutting-edge AI technology to acurately assess candidates' skills and potential, improving retention and workplace culture!
        </div>
        <div className='flexbox-three'>
        <img src={third} alt="Emotiondetection by AI" className='emoimg'/>
            Experience the power of AI-driven interviews, eliminating human bias and streamlining recruitment like never before!
        </div>
    </div>
    </div>
  )
}