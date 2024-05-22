import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
  handleUpload = async () => {
    const localFileName = 'harvard.wav'; // Change to your local file name
    const formData = new FormData();
    const file = new File([""], localFileName, { responseType: "arraybuffer",type: "audio/wav" });

    formData.append('file', file,);

    try {
      await axios.post('http://127.0.0.1:5000/data1', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.handleUpload}>Upload File</button>
      </div>
    );
  }
}

export default Dashboard;

















// import React,{Component} from "react";

// import MicRecorder from 'mic-recorder-to-mp3';
// import axios from "axios";

// const Mp3Recorder = new MicRecorder({bitRate:128});

// export default class Dashboard extends Component{
//     state = {
//         isRecording:false,
//         blobURL:'',
//         isBlocked:false,
//     };

//     componentDidMount(){
//         navigator.getUserMedia({audio:true},
//         () => {
//             console.log('Permission Granted')
//             this.setState({isBlocked:false})
//         },
//         () =>{
//             console.log('Permission denied')
//             this.setState({isBlocked:true})
//         },);
//     }
//     start = () =>{
//         if(this.state.isBlocked){
//             console.log('permission denied')
//         }
//         else{
//             Mp3Recorder
//             .start()
//             .then(()=>{this.setState({isRecording:true})}).catch((e)=>console.error(e));
//         }
//     }
//     stop = async() =>{
//         Mp3Recorder
//         .stop()
//         .getMp3()
//         .then(async([buffer,blob])=>{const blobURL = URL.createObjectURL(blob)
//             const file = new File(buffer,'audio.mp3',{
//                 type:blob.type,
//                 lastModified:Date.now()
//             })
//             const file2 = new File(buffer,'audio12.mp3')
//             const formData = new FormData();
//         formData.append('file[]', file);
//         formData.append('file[]', file2);
//         try{
//         const fileResponse = await axios.post('http://127.0.0.1:5000/audio', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//           });
//           console.log('File uploaded successfully', fileResponse);
//         }
//         catch (error) {
//             console.error('Error:', error);
//             // Handle errors here
//           }

//         this.setState({blobURL,isRecording:false});}
//         )
//         .catch((e) => console.log(e));

//     }
//     render(){
//         return(
//             <div>
//                 <button onClick={this.start} disabled = {this.state.isRecording}>Record</button>
//                 <button onClick={this.stop} disabled = {!this.state.isRecording}>Stop</button>
//                 <audio src = {this.state.blobURL} controls='controls'/>
//                 <p>hello</p>
//             </div>
//         )
//     }
// }


















// import React, { Component } from "react";
// import MicRecorder from 'mic-recorder-to-mp3';
// import axios from "axios";

// const Mp3Recorder = new MicRecorder({ bitRate: 128 });

// export default class Dashboard extends Component {
//     state = {
//         isRecording: false,
//         blobURLs: [], // Store multiple blob URLs in an array
//         isBlocked: false,
//     };

//     // ... (Other methods remain the same)

//     stop = async () => {
//         Mp3Recorder
//             .stop()
//             .getMp3()
//             .then(async ([buffer, blob]) => {
//                 const newBlobURL = URL.createObjectURL(blob);

//                 // Create a new array by spreading the existing blob URLs and adding the new one
//                 const updatedBlobURLs = [...this.state.blobURLs, newBlobURL];

//                 this.setState({
//                     blobURLs: updatedBlobURLs,
//                     isRecording: false,
//                 });
//             })
//             .catch((e) => console.log(e));
//     };

//     render() {
//         return (
//             <div>
//                 <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
//                 <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
//                 {/* Map through the array of blob URLs to display multiple audio elements */}
//                 {this.state.blobURLs.map((blobURL, index) => (
//                     <audio key={index} src={blobURL} controls='controls' />
//                 ))}
//                 <p>hello</p>
//             </div>
//         )
//     }
// }
