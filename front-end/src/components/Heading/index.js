import React from 'react'
import './style.css'
import logobeside from '../logobeside.jpg'
export default function Heading() {
  return (
    <div className="main-heading">
       <h2><span className="text-highlight">A</span>ce Your Job<br></br><br></br>Interview with AI</h2>
       <img src={logobeside} alt="img" className='logobesideimg'/>
    </div>
  )
}