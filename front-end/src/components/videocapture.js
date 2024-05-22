// // import Webcam from "react-webcam";
// // import React, { useState, useRef, useCallback } from "react";

// // const Videocapture = () => {
// //     const webcamRef = React.useRef(null);
// //     const mediaRecorderRef = React.useRef(null);
// //     const [capturing, setCapturing] = React.useState(false);
// //     const [recordedChunks, setRecordedChunks] = React.useState([]);
  
// //     const handleStartCaptureClick = React.useCallback(() => {
// //       setCapturing(true);
// //       mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
// //         mimeType: "video/webm"
// //       });
// //       mediaRecorderRef.current.addEventListener(
// //         "dataavailable",
// //         handleDataAvailable
// //       );
// //       mediaRecorderRef.current.start();
// //     }, [webcamRef, setCapturing, mediaRecorderRef]);
  
// //     const handleDataAvailable = React.useCallback(
// //       ({ data }) => {
// //         if (data.size > 0) {
// //           setRecordedChunks((prev) => prev.concat(data));
// //         }
// //       },
// //       [setRecordedChunks]
// //     );
  
// //     const handleStopCaptureClick = React.useCallback(() => {
// //       mediaRecorderRef.current.stop();
// //       setCapturing(false);
// //     }, [mediaRecorderRef, webcamRef, setCapturing]);
  
// //     const handleDownload = React.useCallback(() => {
// //       if (recordedChunks.length) {
// //         const blob = new Blob(recordedChunks, {
// //           type: "video/webm"
// //         });
// //         const url = URL.createObjectURL(blob);
// //         const a = document.createElement("a");
// //         document.body.appendChild(a);
// //         a.style = "display: none";
// //         a.href = url;
// //         a.download = "react-webcam-stream-capture.webm";
// //         a.click();
// //         window.URL.revokeObjectURL(url);
// //         setRecordedChunks([]);
// //       }
// //     }, [recordedChunks]);
  
// //     return (
// //       <>
// //         <Webcam audio={true} ref={webcamRef} />
// //         {capturing ? (
// //           <button onClick={handleStopCaptureClick}>Stop Capture</button>
// //         ) : (
// //           <button onClick={handleStartCaptureClick}>Start Capture</button>
// //         )}
// //         {recordedChunks.length > 0 && (
// //           <button onClick={handleDownload}>Download</button>
// //         )}
// //       </>
// //     );
// //   };
// // export default Videocapture;


// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";

// const VideoCapture = () => {
//   const webcamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const [capturing, setCapturing] = useState(false);
//   const [recordedChunks, setRecordedChunks] = useState([]);

//   const handleStartCaptureClick = async () => {
//     setCapturing(true);
//     const stream = webcamRef.current.video.srcObject;

//     try {
//       const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mixedStream = new MediaStream([...stream.getTracks(), ...audioStream.getTracks()]);

//       mediaRecorderRef.current = new MediaRecorder(mixedStream, { mimeType: "video/webm" });
//       mediaRecorderRef.current.ondataavailable = handleDataAvailable;
//       mediaRecorderRef.current.start();
//     } catch (error) {
//       console.error("Error accessing the microphone:", error);
//     }
//   };

//   const handleDataAvailable = ({ data }) => {
//     if (data.size > 0) {
//       setRecordedChunks((prev) => prev.concat(data));
//     }
//   };

//   const handleStopCaptureClick = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setCapturing(false);
//     }
//   };

//   const handleDownload = () => {
//     if (recordedChunks.length) {
//       const blob = new Blob(recordedChunks, { type: "video/webm" });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       document.body.appendChild(a);
//       a.style = "display: none";
//       a.href = url;
//       a.download = "video_capture.webm";
//       a.click();
//       window.URL.revokeObjectURL(url);
//       setRecordedChunks([]);
//     }
//   };

//   return (
//     <div>
//       <Webcam audio={false} ref={webcamRef} />
//       {capturing ? (
//         <button onClick={handleStopCaptureClick}>Stop Capture</button>
//       ) : (
//         <button onClick={handleStartCaptureClick}>Start Capture</button>
//       )}
//       {recordedChunks.length > 0 && (
//         <button onClick={handleDownload}>Download</button>
//       )}
//     </div>
//   );
// };

// export default VideoCapture;







// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";

// const VideoCapture = () => {
//   const webcamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const [capturing, setCapturing] = useState(false);
//   const [recordedChunks, setRecordedChunks] = useState([]);

//   const handleStartCaptureClick = async () => {
//     setCapturing(true);
//     const stream = webcamRef.current.video.srcObject;

//     try {
//       const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mixedStream = new MediaStream([...stream.getTracks(), ...audioStream.getTracks()]);

//       mediaRecorderRef.current = new MediaRecorder(mixedStream, { mimeType: "video/webm" });
//       mediaRecorderRef.current.ondataavailable = handleDataAvailable;
//       mediaRecorderRef.current.start();
//     } catch (error) {
//       console.error("Error accessing the microphone:", error);
//     }
//   };

//   const handleDataAvailable = ({ data }) => {
//     if (data.size > 0) {
//       setRecordedChunks((prev) => prev.concat(data));
//     }
//   };

//   const handleStopCaptureClick = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setCapturing(false);
//     }
//   };

//   const handleDownload = () => {
//     if (recordedChunks.length) {
//       const blob = new Blob(recordedChunks, { type: "video/webm" });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       document.body.appendChild(a);
//       a.style = "display: none";
//       a.href = url;
//       a.download = "video_capture.webm";
//       a.click();
//       window.URL.revokeObjectURL(url);
//       setRecordedChunks([]);
//     }
//   };

//   const handleUpload = async () => {
//     if (recordedChunks.length) {
//       const blob = new Blob(recordedChunks, { type: "video/webm" });
//       const formData = new FormData();
//       formData.append("video", blob, "video.webm");

//       try {
//         await axios.post("http://localhost:5000/upload2", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data"
//           },
//         });
//         setRecordedChunks([]);
//       } catch (error) {
//         console.error("Error uploading video:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <Webcam audio={false} ref={webcamRef} />
//       {capturing ? (
//         <button onClick={handleStopCaptureClick}>Stop Capture</button>
//       ) : (
//         <button onClick={handleStartCaptureClick}>Start Capture</button>
//       )}
//       {recordedChunks.length > 0 && (
//         <div>
//           <button onClick={handleDownload}>Download</button>
//           <button onClick={handleUpload}>Upload</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoCapture;




// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";

// const VideoCapture = () => {
//   const webcamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const [capturing, setCapturing] = useState(false);
//   const [recordedChunksArray, setRecordedChunksArray] = useState([]);

//   const handleStartCaptureClick = async () => {
//     setCapturing(true);
//     const stream = webcamRef.current.video.srcObject;

//     try {
//       const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mixedStream = new MediaStream([...stream.getTracks(), ...audioStream.getTracks()]);

//       const mediaRecorder = new MediaRecorder(mixedStream, { mimeType: "video/webm" });
//       const recordedChunks = [];
      
//       mediaRecorder.ondataavailable = ({ data }) => {
//         if (data.size > 0) {
//           recordedChunks.push(data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         setRecordedChunksArray(prev => [...prev, recordedChunks]);
//       };

//       mediaRecorder.start();
//       mediaRecorderRef.current = mediaRecorder;
//     } catch (error) {
//       console.error("Error accessing the microphone:", error);
//     }
//   };

//   const handleStopCaptureClick = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setCapturing(false);
//     }
//   };

//   const handleDownload = () => {
//     // Download individual recorded chunks if needed
//     // For example, for downloading each video separately
//     recordedChunksArray.forEach((recordedChunks, index) => {
//       const blob = new Blob(recordedChunks, { type: "video/webm" });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       document.body.appendChild(a);
//       a.style = "display: none";
//       a.href = url;
//       a.download = `video_${index}.webm`;
//       a.click();
//       window.URL.revokeObjectURL(url);
//     });
//   };

//   const handleUpload = async () => {
//     // Upload all recorded chunks to the backend
//     recordedChunksArray.forEach(async (recordedChunks) => {
//       if (recordedChunks.length) {
//         const blob = new Blob(recordedChunks, { type: "video/webm" });
//         const formData = new FormData();
//         formData.append("video", blob, "video.webm");

//         try {
//           await axios.post("http://localhost:5000/uploadVideo", formData, {
//             headers: {
//               "Content-Type": "multipart/form-data"
//             },
//           });
//         } catch (error) {
//           console.error("Error uploading video:", error);
//         }
//       }
//     });
//     setRecordedChunksArray([]); // Clear recorded chunks array after upload
//   };

//   return (
//     <div>
//       <Webcam audio={false} ref={webcamRef} />
//       {capturing ? (
//         <button onClick={handleStopCaptureClick}>Stop Capture</button>
//       ) : (
//         <button onClick={handleStartCaptureClick}>Start Capture</button>
//       )}
//       {recordedChunksArray.length > 0 && (
//         <div>
//           <button onClick={handleDownload}>Download</button>
//           <button onClick={handleUpload}>Upload</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoCapture;
















import React, { Component } from "react";
import Webcam from "react-webcam";
import axios from "axios";

class VideoCapture extends Component {
  constructor(props) {
    super(props);
    this.webcamRef = React.createRef();
    this.mediaRecorderRef = React.createRef();
    this.state = {
      capturing: false,
      recordedChunks: []
    };
  }

  handleStartCaptureClick = async () => {
    this.setState({ capturing: true });
    const stream = this.webcamRef.current.video.srcObject;

    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mixedStream = new MediaStream([...stream.getTracks(), ...audioStream.getTracks()]);

      this.mediaRecorderRef.current = new MediaRecorder(mixedStream, { mimeType: "video/webm" });
      this.mediaRecorderRef.current.ondataavailable = this.handleDataAvailable;
      this.mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing the microphone:", error);
    }
  };

  handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      this.setState(prevState => ({
        recordedChunks: [...prevState.recordedChunks, data]
      }));
    }
  };

  handleStopCaptureClick = () => {
    if (this.mediaRecorderRef.current) {
      this.mediaRecorderRef.current.stop();
      this.setState({ capturing: false });
    }
  };

  handleDownload = () => {
    const { recordedChunks } = this.state;
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "video_capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      this.setState({ recordedChunks: [] });
    }
  };

  handleUpload = async () => {
    const { recordedChunks } = this.state;
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("video", blob, "video.webm");

      try {
        await axios.post("http://localhost:5000/upload2", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        });
        this.setState({ recordedChunks: [] });
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    }
  };

  render() {
    const { capturing, recordedChunks } = this.state;

    return (
      <div>
        <Webcam audio={false} ref={this.webcamRef} />
        {capturing ? (
          <button onClick={this.handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <button onClick={this.handleStartCaptureClick}>Start Capture</button>
        )}
        {recordedChunks.length > 0 && (
          <div>
            <button onClick={this.handleDownload}>Download</button>
            <button onClick={this.handleUpload}>Upload</button>
          </div>
        )}
      </div>
    );
  }
}

export default VideoCapture;
