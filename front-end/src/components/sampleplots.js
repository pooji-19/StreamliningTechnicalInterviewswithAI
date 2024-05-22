// import React, { useState } from 'react';
// import Plot from 'react-plotly.js';
// import axios from 'axios';

// const OverallAnalysis = () => {
//   const [plot, setPlot] = useState(null);

//   // This function is now generalized to send plot codes
//   const sendPlotCode = async (plotCode) => {
//     try {
//       const response = await axios.post('http://localhost:5000/renderplot', {
//         plotcode: plotCode,
//       });
//       setPlot(response.data);
//     } catch (error) {
//       console.log("Error has occurred", error);
//     }
//   };

//   // Event handler for button 1
//   const handleButton1Click = () => {
//     sendPlotCode("1"); // Assuming "1" is the plot code for button 1
//   };

//   // Event handler for button 2
//   const handleButton2Click = () => {
//     sendPlotCode("2"); // Assuming "2" is the plot code for button 2
//   };
//   const handleButton3Click = () => {
//     sendPlotCode("3"); // Assuming "2" is the plot code for button 2
//   };

//   return (
//     <div>
//       <button onClick={handleButton1Click}>Audio Emotion  Analysis</button>
//       <button onClick={handleButton2Click}>Video Emotion Analysis</button>
//       <button onClick={handleButton3Click}>Improvement In Performance</button>
//       {plot && <Plot data={plot.data} layout={plot.layout} />}
// </div>
//   );
// };

// export default OverallAnalysis;





import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

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
    <div>
      <button onClick={() => handleButtonClick("1")}>Audio Emotion Analysis</button>
      <button onClick={() => handleButtonClick("2")}>Video Emotion Analysis</button>
      <button onClick={() => handleButtonClick("3")}>Improvement In Performance</button>
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
