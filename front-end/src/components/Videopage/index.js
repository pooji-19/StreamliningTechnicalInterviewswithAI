import React, { Component } from 'react';
import axios from 'axios';
import Webcam from "react-webcam";
import { Link } from 'react-router-dom';
import './style.css';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
      currentQuestionIndex: 0,
      answers: [],
      inputValue: '',
      isRecording: false,
      recordedChunks: [],
      blobURLs: [],
      isprocessing: true,
    };
    this.webcamRef = React.createRef();
    this.mediaRecorderRef = React.createRef();
  }

  componentDidMount() {
    axios.get('/mainpage') // Fetching questions from the backend
      .then((response) => {
        this.setState({
          questionsList: response.data,
          answers: Array(response.data.length).fill(''),
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  moveToNextQuestion = () => {
    if (this.state.currentQuestionIndex < this.state.questionsList.length - 1) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        inputValue: '',
      });
    }
  };

  handleAnswer = (event) => {
    const answer = event.target.value;
    this.setState({
      inputValue: answer,
      answers: this.state.answers.map((ans, index) =>
        index === this.state.currentQuestionIndex ? answer : ans
      ),
    });
  };

  handleStartCaptureClick = async () => {
    this.setState({ isRecording: true });

    try {
      const webcamStream = this.webcamRef.current.video.srcObject;
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const videoTracks = webcamStream.getVideoTracks()[0];
      const audioTracks = audioStream.getAudioTracks()[0];

      const mixedStream = new MediaStream([videoTracks, audioTracks]);

      this.mediaRecorderRef.current = new MediaRecorder(mixedStream, { mimeType: "video/webm" });
      let recordedChunks = [];

      this.mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      this.mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const newBlobURL = URL.createObjectURL(blob);

        this.setState(prevState => ({
          blobURLs: [...prevState.blobURLs, newBlobURL],
          isRecording: false,
        }));
      };

      this.mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing the camera or microphone:", error);
    }
  };

  handleStopCaptureClick = () => {
    if (this.mediaRecorderRef.current) {
      this.mediaRecorderRef.current.stop();
    }
  };


  handleSubmit = async (event) => {

    event.preventDefault();
    const { blobURLs } = this.state;

    try {
      const formData = new FormData();

      const promises = blobURLs.map(async (blobURL, index) => {
        try {
          const response = await fetch(blobURL);
          if (response.ok) {
            const blob = await response.blob();
            formData.append('files[]', blob, `video_${index}.webm`);
          } else {
            throw new Error('Failed to fetch blob');
          }
        } catch (error) {
          throw new Error(`Error fetching blob ${index}: ${error.message}`);
        }
      });

      await Promise.all(promises);

      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
    this.setState({ isprocessing: false })
  };


  render() {
    const { questionsList, currentQuestionIndex, inputValue, answers, isRecording } = this.state;

    return (
      <div>
        {currentQuestionIndex < questionsList.length ? (
          <div>
            <p className='question'>{questionsList[currentQuestionIndex]}</p>
            <div className="webcam-container">
              <Webcam ref={this.webcamRef} className='webcam' /> {/* Assuming you have a Webcam component */}
            </div>
            <button onClick={this.handleStartCaptureClick} disabled={isRecording} className='startrecord'>Start Record</button>
            <button onClick={this.handleStopCaptureClick} disabled={!isRecording} className='stoprecord'>Stop Record</button>
            {currentQuestionIndex === questionsList.length - 1 ? (
              <div>
                <Link to='/'><button  className="submittest" onClick={this.handleSubmit}>Submit Test</button></Link>
                {/* {this.state.isprocessing ? (
                  <p>Processing and Getting your Result Please do wait...</p>
                ) : (
                  <div>
                    <p>The Result are added to Analysis dash Boards. Thank You You can Leave</p>
                    <Link to="/">Return To Home Page</Link>
                  </div>
                )} */}
              </div>
            ) : (
              <button onClick={this.moveToNextQuestion} className="nextvideopage">Next</button>
            )}
          </div>
        ) : (
          <div>
            <h2>Questions and Answers:</h2>
            <ul>
              {questionsList.map((question, index) => (
                <li key={index}>
                  <strong>{question}</strong> - {answers[index] ? answers[index] : 'Not answered'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default MainPage;

