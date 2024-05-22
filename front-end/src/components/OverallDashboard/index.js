import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import './style.css'
import {Link} from "react-router-dom";

const OverallAnalysis = () => {
  const [plots, setPlots] = useState([]); // State to store plots

  // Function to fetch and add a new plot
  const addPlot = async (plotCode) => {
    // Check if plot with the same code is already present
    if (plots.some(plot => plot.code === plotCode)) {
      alert("Plot is already present!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/renderplot', {
        plotcode: plotCode,
      });
      const newPlot = { code: plotCode, data: response.data.data, layout: response.data.layout };
      setPlots(prevPlots => [...prevPlots, newPlot]); // Add new plot to the existing list
    } catch (error) {
      console.log("Error has occurred", error);
    }
  };

  // Event handlers for buttons
  const handleButtonClick = (plotCode) => {
    addPlot(plotCode);
  };

  return (
    <div className='overalldashboard'>
      <Link to="/MainPage"><button className="backoveralldashboard">Back</button></Link>
      <button className="overalldashboardbutton1" onClick={() => handleButtonClick("1")}>Audio Emotion Analysis </button>
      <button  className="overalldashboardbutton2" onClick={() => handleButtonClick("2")}>Video Emotion Analysis</button>
      <button className="overalldashboardbutton3" onClick={() => handleButtonClick("3")}>Improvement In Performance</button>
      {/* Render all plots */}
      {plots.map((plot, index) => (
        <div key={index}>
          <p>Plot {plot.code}</p>
          <Plot data={plot.data} layout={plot.layout} />
        </div>
      ))}
    </div>
  );
};

export default OverallAnalysis;
