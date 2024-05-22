import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';


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
      navigate('/interview');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Please upload your file</h1>
        <input type='file' onChange={handleFileChange} accept=".pdf" />
        {selectedFile && <p>You have selected file: {selectedFile.name}</p>}
        <br></br>
        <p>Please select the Difficulty level</p>
        <Select options={options} onChange={handleChange} value={selectedOption} />
        <button type='submit'>Start</button>
      </form>
    </div>
  );
};

export default Acceptfile;


