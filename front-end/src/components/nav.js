import React from 'react'
// import './style.css'
// import logo from '../sti_logo.png'
// import {Link} from 'react-router-dom'
export default function NavBar() {
  return (
    <div className='nav-bar'>
        <div className="header">
          <img src={logo} className="logo" alt="logo"/>
          <Link to="/SignIn"><button>Sign In</button></Link>
          <Link to="/SignUp"><button>Sign Up</button></Link>
        </div>
   
       
    </div>
  )
}