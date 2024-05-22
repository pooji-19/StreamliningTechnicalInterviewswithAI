import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './style.css'
import { format, parseISO } from 'date-fns';
import {Link} from "react-router-dom";

// import Table from './component/Table/index'
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
                
                <button  className='b1'  onClick={() => sendPlotCode_INTID("1", int_id)}>Interview Audio Emotion Analysis</button>
                <button className='b2'  onClick={() => sendPlotCode_INTID("2", int_id)}>Interview Video Emotion Analysis</button>
                <button  className='b3'  onClick={() => sendPlotCode_INTID("3", int_id)}>Factness Score Analysis</button>
                <button className='b4'  onClick={() => sendPlotCode_INTID("4", int_id)}>Performance With Respect To Time</button>
                <button  className='b5' onClick={() => sendPlotCode_INTID("5", int_id)}>Interview Domain Analysis</button>

            </div>
        );
    };
    const parseTime = (unixTimestamp) => {
        // Unix timestamp
        // var unixTimestamp = 1711775617.725358;
    
        // Create a new Date object
        var date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    
        // Convert to a string
        var formattedDateTime = date.toISOString();
    
        return format(new Date(parseISO(formattedDateTime)), 'dd-MM-yyyy hh:mm aa')
    
    }
    return (
        
        <div>
             <Link to="/MainPage"><button className='individualbackbutton'>Back</button></Link>

            <h2 className='individualdashboardheading'>Interview Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Timestamp</th>
                        <th>Analysis</th>
                    </tr>
                </thead>
                <tbody>
                    {interviewData?.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>{item[0]}</td>
                                <td>{parseTime(item[1])}</td>
                                <td>
                                {/* <Link to="/IndividualAnalysisDashboard"><button>Analyse the Interview</button></Link> */}
                                 <button  className="analysetheinterview"onClick={() => handleAnalyseClick(item[0])}>Analyse the Interview</button>
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
