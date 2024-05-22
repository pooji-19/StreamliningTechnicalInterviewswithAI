import React from 'react'
import './style.css'
import {Link} from "react-router-dom";
export default function index() {
  return (
    <div>
      <h1 className='guidelinesheader'>Guidelines</h1>
    <div className='guidelinesmainblock'>
      
      <div className='guidelinesblock1'>
      <h4><span className='g1'>&#11088;</span>Read the questions clearly and understand them.</h4> 
      <br/> <h4><span className='g1'>&#11088;</span>Allocate time wisely  for each question.</h4> 
      <br/>  <h4><span className='g2'>&#11088;</span>Stay composed and focused throughout process.</h4>
      <br/> <h4><span className='g4'>&#11088;</span>Communicate concepts clearly and concisely in verbal/written.</h4>
      </div>
      <div className='guidelinesblock2'>
      <h4><span className='g1'>&#11088;</span>Develop a clear and concise elevator pitch about yourself.</h4> 
      <br/>     <h4><span className='g3'>&#11088;</span>Reflect on performance and identify areas for improvement afterward.</h4>

      </div>
      <Link to="/VideoPage"><button className='nextguidelines'>Next</button></Link>
    </div>
    </div>
    
  )
}
