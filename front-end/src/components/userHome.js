import React from "react";
import { Link } from "react-router-dom";
const UserHome = () =>{
    return(
        <div>
            <h1>Heloo User</h1>
            <Link to="/preinterview"><button>Take Instant interview</button></Link>
            {/* <Link to="/SignUp"><button>Past Interview Performance</button></Link> */}
            <h1>Past Interview Performance</h1>
            <Link to="/individualanalysis"><button>Individual Interview Performance</button></Link>

            <Link to="/overallanalysis"><button>Overall Performance Analysis</button></Link>

        </div>
    )
}
export default UserHome;