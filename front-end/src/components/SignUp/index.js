import React, { useState } from 'react'
import './style.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

export default function SignUp(isHeading) {

  const navigate = useNavigate();
  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('')
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [Signupsuccess,setSignupsuccess] = useState(true);
  const [passwordconfirm, setPasswordConfirm] = useState(true);

  const userchange = (event) => {
    setUsername(event.target.value);
  };

  const passwordchange = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordchange = (event) =>{
    setConfirmPassword(event.target.value);
  }
  const lnamechange = (event) => {
    setLname(event.target.value);
  }
  const fnamechange = (event) =>{
    setFname(event.target.value);
  }

  const handlesignup = async(event) =>{
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordConfirm(false); // Set passwordconfirm state to false
      return; // Stop further execution
    }
    try{
        
        const response = await axios.post('http://localhost:5000/signup',{
            fname,
            lname,
            username,
            password});
            console.log(response.data);
            if (response.data === 'True') {

                navigate('/');
            }
            else{
                setSignupsuccess(false)
            }
    }
    catch (error) {
        console.error('An error occurred:', error);
}
}

  return (
    <div className='body'>
      <Link to="/"><button className="backsignin">Back</button></Link>
       <h3 className='signupheading'>Sign Up</h3>
      <div className='Container2'>
      <form onSubmit={handlesignup}>
      <div>
        <label name='firstName' className='firstName'>First Name : </label>
        <input className='input' id='firstName' name='firstName' placeholder='Enter Your First Name' value={fname} onChange={fnamechange} required></input>
      </div>
      <div>
        <label name='lastName' className='lastName'>Last Name : </label>
        <input className='input' id='lastName' name='lastName' placeholder='Enter Your Last Name' value={lname} onChange={lnamechange} required></input>
      </div>
      <div>
        <label name='userName' className='userName'>User Name : </label>
        <input className='input' id='userName' name='userName' placeholder='Enter User Name' value = {username} onChange={userchange} required></input>
      </div>
      <div>
      <label name='passWord' className='password'>Password : </label>
      <input className='input' id='password' name='password' placeholder='Enter Your password' type="password" value={password} onChange={passwordchange} required></input> 
         </div>
      <div>
        <label name='cpassword' className='cpassword' id='cpass'><span className='confirm'>Confirm :</span><br></br>Password  </label>
        <input className='input' id='cpassword' name='cpassword' placeholder='Confirm Your password' type="password" value={confirmPassword} onChange={confirmPasswordchange} required></input>
      </div>
      
      <div>
        <button type='Submit' className='submitsignup'>Submit</button>
      </div>
      </form>
      {!passwordconfirm ? <p className='user'>Passwords do not match</p> : ''}
      {!Signupsuccess ? <p className='cpassword'>UsernameAlready Exists</p> : ''}
    </div>
    </div>
  )
}