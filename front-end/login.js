import React, {useState} from 'react'
//import './components/loginstyles.css'
//import { toast } from 'react-hot-toast';
//import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './components/auth';
//import SignUp from '../SignUp';

const  SignIn = () => {
  const navigate = useNavigate();
  //toast("hi")
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lis, setLis] = useState(true);
  const auth = useAuth();

  const userchange = (event) => {
    setUsername(event.target.value);
  };

  const passwordchange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signin', {
        username,
        password,
      });

      if (response.data === 'True') {
        //auth.login(username);

        navigate('/home')
      } else {
        setLis(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <div className='body'>
      {/* <div className='signInMove'>
          <SignUp isHeading={true}/>
      </div> */}
       
        <div  className='Container1'>
          <h3 className='siginheading'>Sign In</h3>
        </div>
        <div  className='Container1'>
        <form onSubmit={handleSubmit}>
            <div>
                <h5 className='user'>User Name : </h5>
                <input type="text" id="username" className='input' value={username} onChange={userchange} required></input>
            </div>
            <div>
                <h5 className='pass'>Password : </h5>
                <input type='password' id="password" className='input' value={password} onChange={passwordchange} required></input>
            </div>
            <div>
              <button type = 'submit'>Submit</button>
            </div>
          </form>
          {!lis ? <p className='user'>Invalid userName and password</p> : ''}
          <h3 className='user'>If you don't have an account</h3>
          <a href='signup'>Signup</a>
        </div>
        
        
    </div>
  )
}
export default SignIn;