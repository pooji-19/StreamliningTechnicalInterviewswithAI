import React, { Component } from 'react';
import axios from 'axios';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
      currentQuestionIndex: 0,
      answers: [],
      inputValue: '',
      isRecording: false,
      blobURLs: [],
      isBlocked: false,
    };
  }

  componentDidMount() {
    fetch('/mainpage')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        this.setState({
          questionsList: data,
          answers: Array(data.length).fill(''),
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission denied');
        this.setState({ isBlocked: true });
      });
  }

  handleAnswer = (event) => {
    const answer = event.target.value;
    this.setState({
      inputValue: answer,
      answers: this.state.answers.map((ans, index) =>
        index === this.state.currentQuestionIndex ? answer : ans
      ),
    });
  };

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  stop = async () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        const newBlobURL = URL.createObjectURL(blob);

        this.setState((prevState) => ({
          blobURLs: [...prevState.blobURLs, newBlobURL],
          isRecording: false,
        }));
      })
      .catch((e) => console.log(e));
  };

  moveToNextQuestion = () => {
    if (this.state.currentQuestionIndex < this.state.questionsList.length - 1) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        inputValue: '',
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      currentQuestionIndex: this.state.questionsList.length,
    });
  
    try {
      const formData = new FormData();
  
      // Fetch all blob URLs asynchronously and append them to FormData
      const promises = this.state.blobURLs.map((blobURL, index) => {
        return fetch(blobURL)
          .then(res => res.blob())
          .then(blob => formData.append('files[]', blob, `audio_${index}.mp3`,{ responseType: "arraybuffer",type: 'audio/wav', }))
          .catch(error => console.error(error));
      });
  
      // Wait for all promises to resolve before making the POST request
      await Promise.all(promises);
  
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  render() {
    const { questionsList, currentQuestionIndex, inputValue, answers, blobURLs } = this.state;

    return (
      <div>
        {currentQuestionIndex < questionsList.length ? (
          <div>
            <p>{questionsList[currentQuestionIndex]}</p>
            <input type="text" value={inputValue} onChange={this.handleAnswer} />
            <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
            <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
            {currentQuestionIndex === questionsList.length - 1 ? (
              <button onClick={this.handleSubmit}>Submit</button>
            ) : (
              <button onClick={this.moveToNextQuestion}>Next</button>
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
            <div>
              {blobURLs.map((blobURL, index) => (
                <audio key={index} src={blobURL} controls='controls' />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MainPage;
