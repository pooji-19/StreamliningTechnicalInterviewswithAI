import React, { useState,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './style.css';
import interviewpic from '../preinterviewimg.png';
import {Link} from "react-router-dom";



const Acceptfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const navigate = useNavigate();
  const options = [
    { label: 'Easy', value: 1 },
    { label: 'Medium', value: 2 },
    { label: 'Hard', value: 3 }
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.log('Please select a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const fileResponse = await axios.post('http://127.0.0.1:5000/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('File uploaded successfully', fileResponse);

      const difficultyResponse = await axios.post('http://127.0.0.1:5000/mainpage', {
        selectedoption: selectedOption.label
      }, { mode: 'cors' });

      console.log('Difficulty level posted', difficultyResponse);
      // navigate('/VideoPage');
      navigate('/Guidelines')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    
    <div className='block'>
        <div className='subblock1-circle'></div>
        <div className='sublock2'>
        <img src={interviewpic} alt="Interviewpic" className='interviewpic' />
        </div>
    <div className='content'>
    <Link to="/MainPage"><button className="backpreinterview">Back</button></Link>

         <h2 className='preinterviewhead1'>Upload your Resume</h2>
      < form onSubmit={handleSubmit}>
        {/* <h1>Please upload your file</h1> */}
        {/* <input type='file' onChange={handleFileChange} accept=".pdf"  className='upload' /> */}
        <button className="button-upload" onClick={handleClick}>
        Upload file
      </button>
      <input
        type="file"
        onChange={handleFileChange}
        ref={hiddenFileInput}
        accept='.pdf'
        style={{ display: "none" }} // Make the file input element invisible
      />
      <br></br>
      <br></br>
      <br></br>
        {selectedFile && <p>You have selected file: {selectedFile.name}</p>}
        <br></br>
        <h2 className='preinterviewhead2'>Please select the Difficulty level</h2>
        <Select options={options} onChange={handleChange} value={selectedOption} className='selectfile'/>
        <button type='submit' className='ready'>Start</button>
      </form>
    </div>
    </div>
  );
};

export default Acceptfile;



