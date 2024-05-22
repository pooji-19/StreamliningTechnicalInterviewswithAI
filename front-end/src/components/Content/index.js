import React from 'react'
import './style.css'
import matterimg from '../secondimg.jpg'

export default function Content() {
  return (
    <div>
      <h2 className='aboutheading'>About</h2>
    <div className='mainmatter'>
      <br></br>
      <br></br>
     
        <img src={matterimg}alt="img" className='secondimg'></img>
        <div className='inner-content'>
          <br></br>
          <p> AI job interviews, powered by artificial intelligence,
           are transforming the hiring process.
            These interviews are designed to be fair, efficient, and unbiased.
            Job seekers gain valuable experience through practice interviews and receive instant feedback,
             while employers make data-driven hiring decisions, ensuring a high-quality workforce. 
             This innovation represents a future where technology and human potential unite to streamline 
             and improve the interview and selection process, ultimately reshaping the future of employment.
            Explore how AI is reshaping interviews and making hiring more effective and equitable.</p>
        </div>
         
    </div>
    </div>
  )
}