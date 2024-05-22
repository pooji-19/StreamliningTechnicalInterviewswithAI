## Streamlining Technical Interviews With AI



https://github.com/pooji-19/StreamliningTechnicalInterviewswithAI/assets/119399328/27a0c96b-f689-4301-b1fe-fa1b701bf5c4



# Goal Of Team
Revolutionizing the interviewing process across various domains, including recruitment, paving the way for more insightful and meaningful interactions in the digital age.

# Product Demo
# Technologies and Tools Utilized

- Backend: Flask
- Frontend: Routes
- Multi-Modal Data Conversion: FFMPEG
- Data Analysis Dashboards: Plotly
- Database: SQLite3
- ML Model Training: TensorFlow, Keras, Scikit-learn
- Programming Languages Used: Python, JavaScript, SQL

# Datasets Used 

## RAVDESS Dataset

- Features recordings from 24 professional actors (12 male, 12 female).
- Includes seven basic emotions: neutral, calm, happy, sad, angry, fearful, and disgusted.
- Audio files are typically 3-5 seconds in duration.


## FER 2013 - Facial Expression Recognition 2013

- Contains 35,887 grayscale images sized 48x48 pixels.
- Each image labeled with one of seven facial expressions.
- Grayscale representation.


# QUESTION GENERATION MODEL
Aims to mimic the cognitive processes of human question formulation.

Process Involved:
- NLP Preprocessing
- Grammar
- Regex Parsing
- Question Template Matching
- Question Generation


## Features 

- Dependency on Text Quality
- Variability
- Domain-Specific Limitations


# Video Emotion Detection Model
Pinpoints stress and discomfort in interviewees.
Identifies seven emotions: anger, disgust, fear, happiness, sadness, surprise, or neutral.
Relies on the FER 2013 dataset for robust ML model training and assessment.


# Audio Emotion Detection Model
Captures candidate's emotions and attitude during interviews and analyzes tone, intonation, and speech patterns for emotional cues.


## Working of Audio Emotion Model

- Feature Extraction (MFCCs)
- Feature Representation
- Decision Tree Model
- Training
- Testing and Evaluation


# Fact-Checking Model
Assessment of the factual accuracy and truthfulness of statements, analyzing their linguistic structure and grammatical correctness.


# Algorithms Used
- Levenshtein Distance (Edit Distance)
- Ratio: Compares length and content of strings
- Partial Ratio: Assesses similarity based on best matching substring
- Token Sort Ratio: Ideal for strings with similar content but different word order
- Token Set Ratio: Handles variations in word order and additional or missing words effectively


# Integration with User Interface:

- Flask: Logic and request routing.
- Integration: Flask, React, SQL.
- React: Dynamic UI.
- SQL Database: Stores profiles, interview transcripts


# Data Analysis Dashboards

- Facial Emotion Recognition
- Audio Emotion Recognition
- Fact-Checking Analysis
- Integration and Correlation Analysis


# Integration of FFMPEG Tool
(Fast Forward Moving Picture Experts Group)

Handles audio and video files.
Includes encoding, decoding, transcoding, and format conversion.
Converts between formats like MP4 to MP3 and WAV to MP3.


# EXPERIMENTAL RESULTS
- Video Emotion Model: 77.5% accuracy
- Audio Emotion Model: 86% accuracy


# Key Takeaways
Signifies a notable advancement in recruitment and hiring.
Holds the potential to revolutionize recruitment, enhancing efficiency.


# Future Scope 
- Enhancing question generation
- Focus on incorporating more diverse and nuanced emotional states.
- Semantic-based fact-checking.


# References

- Emotional Analysis of Candidate and Keenness to Join an Organization, Riya Dharamsi, Himani Gwalani, Shaunak Padhye, Rushikesh Yadwade, SCTR’s Pune Institute of Computer Technology, Pune, Maharashtra, India
- Predicting Personality Using Answers to Open-Ended Interview Questions, Madhura Jayaratne, Buddhi Jayatilleke, PredictiveHire Pty Ltd., Cremorne, VIC 3121, Australia, Centre for Data Analytics and Cognition, La Trobe University, Bundoora, VIC 3083, Australia
- A Fuzzy String Matching Method for Recognizing Partially Occluded Objects, Wen-Yen Wu, Department of Industrial Management, I Shou University, Taiwan
- RAVDESS Emotional Speech Audio Dataset, available at: [RAVDESS Emotional Speech Audio Dataset](https://www.kaggle.com/datasets/uwrfkaggler/ravdess-emotional-speech-audio)
- Fuzzywuzzy library, available at: [Fuzzywuzzy library](https://github.com/seatgeek/fuzzywuzzy)
- The Facial Emotion Recognition (FER-2013) Dataset for Prediction System of Micro-Expressions Face Using the Convolutional Neural Network (CNN) Algorithm based Raspberry Pi
