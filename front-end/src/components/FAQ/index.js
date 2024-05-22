import React from 'react';
import './style.css'
import {Link} from 'react-router-dom'
function FAQ() {
  return (
    <div>
    <h1>Frequently Asked Questions (FAQ)</h1>
    <div className='faq-main'>
    <Link to="/"><button className='backfaq'  >Back</button></Link>
     
      <div className="faq-item">
        <h3>1. What is your product about?</h3>
        <p>
          Our product streamlines technical interviews using AI technology. It incorporates video emotion analysis, audio emotion analysis, and interactive question-answering sessions.
        </p>
      </div>
      <div className="faq-item">
        <h3>2. How does the video emotion model work?</h3>
        <p>
          The video emotion model analyzes the facial expressions and body language of the interviewee during the interview, providing insights into their emotional responses.
        </p>
      </div>
      <div className="faq-item">
        <h3>3. What does the audio emotion model do?</h3>
        <p>
          The audio emotion model assesses the tone and pitch of the interviewee's voice, helping to gauge their emotional state and engagement level throughout the interview.
        </p>
      </div>
      <div className="faq-item">
        <h3>4. How does the question-answering feature function?</h3>
        <p>
          Our product asks interview questions to users and accepts their responses as input. It then utilizes fuzzy matching algorithms to validate and assess the accuracy and relevance of their answers.
        </p>
      </div>
      <div className="faq-item">
        <h3>5. What is fuzzy matching, and how is it applied in your product?</h3>
        <p>
          Fuzzy matching, specifically using techniques like fuzzy wuzzy, allows us to compare the similarity between two strings, making it effective for validating textual inputs against expected answers within a certain degree of tolerance.
        </p>
      </div>
      <div className="faq-item">
        <h3>6. Can you explain the process of conducting a technical interview using your product?</h3>
        <p>
          Users engage in a technical interview session where they are presented with questions related to their field. They provide answers to these questions, which are then evaluated using our AI models and fuzzy matching algorithms to provide feedback and insights.
        </p>
      </div>
      <div className="faq-item">
        <h3>7. How accurate are the emotion analysis models?</h3>
        <p>
          Our emotion analysis models leverage state-of-the-art AI techniques and have been trained on extensive datasets to provide accurate assessments of facial expressions, body language, and vocal intonations.
        </p>
      </div>
      <div className="faq-item">
        <h3>8. Is user data stored and secured during the interview process?</h3>
        <p>
          We prioritize the security and privacy of user data. All data collected during the interview process is securely stored and handled in compliance with industry standards and regulations.
        </p>
      </div>
      <div className="faq-item">
        <h3>9. Can your product be customized for specific technical domains or industries?</h3>
        <p>
          Yes, our product can be tailored to accommodate various technical domains and industries, allowing for a personalized interview experience based on specific job roles or skill requirements.
        </p>
      </div>
      <div className="faq-item">
        <h3>10. How does your product differentiate itself from traditional interview methods?</h3>
        <p>
          Our product offers a more efficient and objective interview process by leveraging AI technologies to analyze non-verbal cues, assess responses, and provide valuable insights, enhancing the overall interviewing experience for both candidates and interviewers.
        </p>
      </div>
    </div>
    </div>
  );
}

export default FAQ;
