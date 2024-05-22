// import React from "react";
import mainpageimg from "../mainpagepic1.jpg";
import "./style.css";
import {Link} from "react-router-dom";
import React, { useState, useEffect } from "react";
const MainPage = () =>{
    const [username, setUsername] = useState(""); // Change initial state to empty string for username
    
    useEffect(() => {
        fetch('/userhome')
            .then((response) => response.json())
            .then((data) => {
                // Assuming 'username' is a property of the response data
                setUsername(data); 
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return(
        <div className="main">
            <div className="subblock">
                <div className="subblock1">
                    <img src={mainpageimg} className="mainpageimg"></img>
                </div>
                <div className="subblock2">
                <Link to="/"><button className="backmainpage">Back</button></Link>
                    <h1 className="mainpageheading"><span className="headinghighlight">Hello !</span>
                    <br></br>{username}</h1>
                    <div className="buttons">
                    <Link to="/IndividualDashboard"><button className="indbutton">Individual <br></br>Analysis</button></Link>
                    <Link to="/OverallDashboard"><button className="perbutton">Overall Performance</button></Link>
                    <br></br>
                    <Link to="/PreInterview"><button className="readbutton">Ready for Interview</button></Link>
                    </div>
                    {/* <Link to="/SignIn"><button className="dashbutton">Dashboard</button></Link> */}
                </div>
            </div>
        </div>
    )
}

export default MainPage;