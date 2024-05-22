import React from 'react'
import './style.css';
import logo from '../footerlogo.png';
import {Link} from "react-router-dom";
function index() {
  return (
    <div class="footer">
       {/* <img src={logo} className='footer-logo' alt="logo"></img>
      <p>Developed by unITy squad</p> */}
      <img src={logo} className='footer-logo' alt="footer_logo"></img>
      <p className='footer-content'>Developed by unITy squad</p>
      <Link to="/Contactform" className='contactusfooter'>Contact Us</Link>
      <p className='emailfooter'>Email id: unitysquad03@gmail.com</p>
      <Link to="/FAQ" className='faqfooter'>FAQ's</Link>
    </div>
  )
}

export default index

