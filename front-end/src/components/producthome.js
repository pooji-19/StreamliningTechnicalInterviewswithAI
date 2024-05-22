import React from "react";
import {Link} from 'react-router-dom'


const Producthome = () =>{
    return(
        <div>
            <h>This is Product Home Page</h>
            <Link to="/login"><button>Sign In</button></Link>
            <Link to="/signUp"><button>Sign Up</button></Link>
        </div>
    )
}

export default Producthome;