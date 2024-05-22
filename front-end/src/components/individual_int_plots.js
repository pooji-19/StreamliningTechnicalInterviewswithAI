// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';


// const IndividualPlot = () => {
//     const [Interviewdata, setInterviewdata] = useState([]);
//     const [int_id,setint_id] = useState(null)
//     const [plot, setPlot] = useState(null);
//     const [boolbuttons,setboolbuttons] = useState(False)

//     const sendPlotCode_INTID = async (plotCode,int_id) => {
//         try {
//           const response = await axios.post('http://localhost:5000/renderplot', {
//             plotcode: plotCode,
//             int_id:int_id,
//           });
//           setPlot(response.data);
//         } catch (error) {
//           console.log("Error has occurred", error);
//         }
//       };


//     useEffect(() => {
//         axios.get('/renderinddata')
//             .then(response => {
//                 setInterviewdata(response.data);
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []);


//     return (
//         <div>
//             <h2>Interview Data</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Timestamp</th>
//                         <th>Analysis</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {Interviewdata.map((item, index) => (
//                 <tr key={index}>
//                     <td>{item[0]}</td> 
//                     <td>{item[1]}</td> 
//                     <button onClick={setboolbuttons(true) && setint_id(item[0])}>Analyse the Interview</button>
//                     {boolbuttons && (
//                         <div>
//                             <button onClick={sendPlotCode_INTID("1",int_id)}>plot1</button>
//                             {plot && <Plot data={plot.data} layout={plot.layout} />}
//                             <button onClick={sendPlotCode_INTID("2",int_id)}>plot1</button>
//                             {plot && <Plot data={plot.data} layout={plot.layout} />}
//                             <button>plot3</button>
//                         </div>
//                     )}


//                 </tr>
//                     ))}

//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default IndividualPlot;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const IndividualPlot = () => {
    const [interviewData, setInterviewData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedPlot, setSelectedPlot] = useState(null);

    const sendPlotCode_INTID = async (plotCode, int_id) => {
        try {
            const response = await axios.post('http://localhost:5000/renderindplots', {
                plotcode: plotCode,
                int_id: int_id,
            });
            setSelectedPlot(response.data);
        } catch (error) {
            console.log("Error has occurred", error);
        }
    };

    useEffect(() => {
        axios.get('/renderinddata')
            .then(response => {
                setInterviewData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleAnalyseClick = (int_id) => {
        setSelectedRow(int_id);
        setSelectedPlot(null); // Reset selected plot when a new row is selected
    };

    const renderPlotButtons = (int_id) => {
        return (
            <div>
                <button onClick={() => sendPlotCode_INTID("1", int_id)}>Interview Audio Emotion Analysis</button>
                <button onClick={() => sendPlotCode_INTID("2", int_id)}>Interview Video Emotion Analysis</button>
                <button onClick={() => sendPlotCode_INTID("3", int_id)}>Factness Score Analysis</button>
                <button onClick={() => sendPlotCode_INTID("4", int_id)}>Performance With Respect To Time</button>
                <button onClick={() => sendPlotCode_INTID("5", int_id)}>Interview Domain Analysis</button>

            </div>
        );
    };

    return (
        <div>
            <h2>Interview Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Timestamp</th>
                        <th>Analysis</th>
                    </tr>
                </thead>
                <tbody>
                    {interviewData.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>
                                    <button onClick={() => handleAnalyseClick(item[0])}>Analyse the Interview</button>
                                </td>
                            </tr>
                            {selectedRow === item[0] && (
                                <tr>
                                    <td colSpan="3">
                                        {renderPlotButtons(item[0])}
                                        {selectedPlot && <Plot data={selectedPlot.data} layout={selectedPlot.layout} />}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default IndividualPlot;
