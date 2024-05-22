from flask import Flask, request,jsonify
from pdfminer.high_level import extract_text
from io import BytesIO
from flask_cors import CORS
from nltk.chunk import RegexpParser
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from nltk.tokenize import sent_tokenize
import numpy as np
import pandas
import random
from fuzzywuzzy import fuzz
import nltk
import os
import subprocess
from io import BytesIO
import speech_recognition as sr
import csv
import joblib
import librosa
import sqlite3
import plotly.graph_objs as go
import plotly.io as pio
import numpy
import plotly.express as px
from plotly.subplots import make_subplots
import time


app = Flask(__name__)
app.secret_key = 'your_secret_key'  
user_skills = []  
level = ''
user_answers = []
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route('/resume', methods=['POST', 'GET'])
def upload_resume():
    global user_skills 
    if request.method == 'POST':
        if 'file' not in request.files:
            return "No file part"
        file = request.files['file']
        if file.filename == '':
            return 'No selected file'
        if file and file.filename.endswith('.pdf'):
            file_bytes = BytesIO()
            file.save(file_bytes)
            file_bytes.seek(0) 
            user_skills = get_resumeskills(file_bytes)  
            return "File uploaded successfully"
        return "Invalid file format, please upload a PDF file"
    if request.method == 'GET':
        return str(user_skills[2]) 

@app.route('/signin',methods=['GET','POST'])
def signin():
    global user_name
    global password
    if request.method == 'POST':
        data = request.get_json()
        user_name =data.get('username')
        password = data.get('password')
        return str(authenticate(user_name,password))
@app.route('/signup',methods=['GET','POST'])
def signup():
    global user_info
    if request.method == 'POST':
        data = request.get_json()
        lname = data.get('lname')
        fname = data.get('fname')
        username = data.get('username')
        password = data.get('password')
        user_info = [lname,fname,username,password]
        return str(register_user(username,password,fname,lname,))
    
@app.route('/userhome',methods=['GET','POST'])
def send_username():
    if request.method == 'GET':
        return jsonify(get_fullname(user_name))


@app.route('/mainpage', methods=['POST', 'GET'])
def mainpage():
    global level
    global user_answers 
    if request.method == 'POST':
        data = request.json
        level = data.get('selectedoption')
        return 'done'
    if request.method == 'GET':
        domains = user_skills
        num_questions = get_questionlen(level)
        
        last_int_id = view_User_Question_Data()[-1][0]
        recent_int_id = get_next_ID(last_int_id)
        insertinto_USER_INTERVIEW(user_name,recent_int_id)
        ques = generate_insert_questions_to_db(domains,num_questions,recent_int_id)
        return ques
    
@app.route('/upload', methods=['POST'])
def upload_video():
    if 'files[]' not in request.files:
        return jsonify({'error': 'No files were uploaded'}), 400

    files = request.files.getlist('files[]')
    if files:
        actual_answers = eval(view_User_Question_Data()[-1][2])
        curr_int_id = view_User_Question_Data()[-1][0]
        domains = eval(view_User_Question_Data()[-1][3])
        overall_Video_emotions = []
        overall_audio_emotions = []
        overall_factness_scores = []
        for index, file in enumerate(files):
            video_data = file.read()
            with open(f"uploaded_video_{index}.webm", "wb") as output_file:
                output_file.write(video_data)
                path = f"uploaded_video_{index}.webm"
                
                convertwebmtomp4(path,index)
                video_emotions = video_emotion_detection(f'uploaded_video_{index}.mp4')
                overall_Video_emotions.append(video_emotions)
                convertwebmtomp3(path,index)
                audio_emotion = audio_emotion_detection(f'uploaded_video_{index}.mp3')
                overall_audio_emotions.append(audio_emotion)
                new_path = f'uploaded_video_{index}.mp3'
                convermp3towav(new_path,index)
                text = audio_to_text(f'uploaded_video_{index}.wav')
                factness_score = get_factness_score(actual_answers[index],text)
                overall_factness_scores.append(factness_score)
                with open('dummy.csv','a') as f:
                    c_ob = csv.writer(f)
                    c_ob.writerow([curr_int_id,video_emotions,audio_emotion,text,domains[index],level,str(time.time()),factness_score])
        insertinto_INTERVIEW(curr_int_id,str(overall_Video_emotions),str(overall_audio_emotions),str(overall_factness_scores),str(domains),level,str(time.time()))
        return jsonify({'message': 'Videos uploaded and saved successfully'}), 200
    else:
        return jsonify({'error': 'No files were uploaded'}), 400





def authenticate(username,password):
    conn = sqlite3.connect('product_database.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM USER")
    rows = cursor.fetchall()
    conn.close()
    for x in rows:
        if x[0] == username:
            if x[1] == password:
                return True
    return False



#Signup Component 
def add_data(username, password,fname,lname):
    conn = sqlite3.connect('product_database.db')
    cursor = conn.cursor()

    # Pass the parameters as a tuple to the execute function
    cursor.execute("INSERT INTO USER(USERNAME, PASSWORD,FNAME, LNAME) VALUES (?, ?, ?, ?)", (username, password,fname,lname))

    conn.commit()
    conn.close()





def check_unique(username):
    conn = sqlite3.connect('product_database.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM USER")
    rows = cursor.fetchall()
    conn.close()
    return username in [x[0] for x in rows]



def register_user(username, password,fname,lname):
    if not check_unique(username):
        add_data(username, password,fname,lname)
        return True
    else:
        return False
    



def get_resumeskills(file):
    text = extract_text(file)
    skills_list = [ "MachineLearning",'DataScience','NaturalLanguageProcessing','SoftwareEngineering','Artificial Intelligence','BigData','Data Visualization','DataBaseManagementSystems','Python','DeepLearning','SQL']
    user_skills = []
    for x in skills_list:
        if x in text:
            user_skills.append(x)
    if(len(user_skills) == 0):
        return ["MachineLearning"]
    return user_skills




def generate_questionanswerpair(domain,quelength):
    question_pattern = pandas.read_csv('question_patterns.csv').columns.tolist()
    if domain == "MachineLearning":
        file_name = r'Corpora\MLCorpus.txt'
    elif domain == 'DataScience':
        file_name = r'Corpora\DataWranglingCorpus.txt'
    elif domain == 'NaturalLanguageProcessing':
        file_name = r'Corpora\nlpCorpus.txt'
    elif domain == 'SoftwareEngineering':
        file_name = r'Corpora\SECorpus.txt'
    elif domain == 'Artificial Intelligence':
        file_name = r'Corpora\Artificial Intelligence (AI)  Corpus.txt'
    elif domain == 'BigData':
        file_name = r'Corpora\BigDataCorpus.txt'
    elif domain == 'Data Visualization':
        file_name = r'Corpora\Data visualization Corpus.txt'
    elif domain == 'DataBaseManagementSystems':
        file_name = r'Corpora\DBMS Corpus.txt'
    elif domain == 'Python':
        file_name = r'Corpora\Python Corpus.txt'
    elif domain == 'DeepLearning':
        file_name = r'Corpora\DLcorpus.txt'
    elif domain == 'SQL':
        file_name = r'Corpora\SQL  Corpus.txt'
    else: 
        return None
    with open(file_name,'r') as f:
        summary = f.read()
    grammar = r"""
        CHUNK: {<NN.*|JJ.*>*<NN.*>}
        }<VB.*|DT|IN|JJ|CC|TO>{
    """
    sentences = sent_tokenize(summary)
    cp = RegexpParser(grammar)
    question_answer_dict = dict()
    for sentence in sentences:
        tagged_words = pos_tag(word_tokenize(sentence))
        tree = cp.parse(tagged_words)
        for subtree in tree.subtrees():
            if subtree.label() == "CHUNK":
                temp = " ".join(word for word, tag in subtree.leaves())
                temp = temp.upper()
                if temp not in question_answer_dict:
                    question_answer_dict[temp] = []
                question_answer_dict[temp].append(sentence)

    keyword_list = list(question_answer_dict.keys())
    question_answer = list()
    for _ in range(int(quelength)):#no of qquestions
        rand_num = np.random.randint(0, len(keyword_list))
        selected_key = keyword_list[rand_num]
        answer = question_answer_dict[selected_key]
        rand_num %= 4
        question = question_pattern[rand_num]+' ' + selected_key + "."
        question_answer.append({"Question": question, "Answer": answer})
    que = []
    ans = []
    for x in question_answer:
        que.append(x['Question'])
        ans.append(x['Answer'])
    #note Here sometimes the answer comatins muliple strings, I am here taking the first one as a accurate one
    for x in range(len(ans)):
        if(len(ans[x]) != 0):
            ans[x] = ans[x][0]
    return que,ans




def get_questionlen(level):
    if level == 'Easy':
        return random.randint(1,3)
    elif level == 'Medium':
        return random.randint(4,6)
    else:
        return random.randint(7,9)



def convert_mp3_to_wav(mp3_data):
    wav_data = BytesIO()

    # Reset the position of mp3_data to the beginning
    mp3_data.seek(0)

    # Use subprocess.Popen to create a process and connect pipes explicitly
    with subprocess.Popen(
        ['ffmpeg', '-i', 'pipe:0', '-f', 'wav', 'pipe:1'],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    ) as process:
        # Send the mp3_data to the stdin of the process
        stdout, stderr = process.communicate(input=mp3_data.read())

        # Write the stdout to wav_data
        wav_data.write(stdout)
    return wav_data

def audioTotext(file):
    recognizer = sr.Recognizer()
    with sr.AudioFile(file) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
        # with open('answers.csv','a') as f:
        #     c_ob = csv.writer(f)
        #     c_ob.writerow([text])
        return text

def convertwebmtomp4(filepath,index):
    
    input_file = filepath
    output_file = f"uploaded_video_{index}.mp4"

    # Run FFmpeg command to convert WebM to MP4
    command = ['ffmpeg', '-i', input_file, '-strict', 'experimental', output_file,'-y']
    subprocess.run(command)

def convertwebmtomp3(filepath,index):
    input_file = filepath
    output_file = f"uploaded_video_{index}.mp3"

    # Run FFmpeg command to convert WebM to MP4
    command = ['ffmpeg', '-i', input_file, '-strict', 'experimental', output_file,'-y']
    subprocess.run(command)


def convermp3towav(filepath,index):
    input_file = filepath
    output_file = f'uploaded_video_{index}.wav'

    # Run FFmpeg command to convert WebM to MP4
    command = ['ffmpeg', '-i', input_file, '-strict', 'experimental', output_file,'-y']
    subprocess.run(command)



def audio_to_text(file_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(file_path) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
        return text
def get_factness_score(actual_sent,user_sent):
    return fuzz.token_set_ratio(user_sent,actual_sent)











import cv2
import csv
import numpy as np
from keras.models import model_from_json
def video_emotion_detection(filepath):
    json_file = open('fer.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    model = model_from_json(loaded_model_json)
    model.load_weights('fer.h5')
    emotion_labels = ["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"]
    video_path = filepath
    cap = cv2.VideoCapture(video_path)
    emotions_list = []
    while cap.isOpened():
        ret, frame = cap.read()

        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        for (x, y, w, h) in faces:
            roi = gray[y:y + h, x:x + w]
            roi = cv2.resize(roi, (48, 48))
            roi = roi / 255.0
            roi = np.reshape(roi, (1, 48, 48, 1))

            # Predict emotion - this assumes 'model' and 'emotion_labels' are defined and accessible
            emotion_prediction = model.predict(roi)
            emotion_index = np.argmax(emotion_prediction)
            emotion = emotion_labels[emotion_index]

            emotions_list.append(emotion)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    with open('samplevideoemotionresults,csv','w') as f:
        c_ob = csv.writer(f)
        c_ob.writerow(emotions_list)
    return emotions_list






def audio_emotion_detection(file_path):
    int2emotion = {1: 'neutral', 2: 'calm', 3: 'happy', 4: 'sad', 5: 'angry', 6: 'fearful', 7: 'disgust', 8: 'surprised'}
    model = joblib.load('audioemotionmodel.joblib')
    X, sample_rate = librosa.load(file_path, res_type='kaiser_fast')
    mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=40).T,axis=0) 
    mfccs = mfccs.reshape(-1, len(mfccs))
    predicted_emotion = model.predict(mfccs)
    return int2emotion[predicted_emotion[0]]    









def view_USER():
    with  sqlite3.connect('product_database.db') as conn:

        cur = conn.cursor()

        data = cur.execute('SELECT * from USER').fetchall()
        #if it is the first interview add "INT000" to database
        conn.commit()
        return data

def view_USER_INTERVIEW():
    with  sqlite3.connect('product_database.db') as conn:

        cur = conn.cursor()

        data = cur.execute('SELECT * from USER_INTERVIEW').fetchall()
        #if it is the first interview add "INT000" to database
        conn.commit()
        return data

def view_INTERVIEW():
    db_file = 'product_database.db'
    sql_query = 'SELECT * FROM INTERVIEW'
    with sqlite3.connect(db_file) as conn:
        cur = conn.cursor()
        data = cur.execute(sql_query).fetchall()
        conn.commit()
        return data

        
#Data Analysis Dashboards

#**********************************plot1****************************************
# Audio Emotion Plot(Individual + Overall)
def get_audio_emotion_piechart(audio_emotions):

    category_data = audio_emotions


    category_counts = {category: category_data.count(category) for category in set(category_data)}

    pleasant_colors = ['#ADD8E6', '#90EE90', '#FFD700', '#FFB6C1', '#E6E6FA', '#FFFFE0', '#AFEEEE', '#F08080', '#E6E6FA', '#FFDAB9']

    fig = go.Figure(data=[go.Pie(labels=list(category_counts.keys()), values=list(category_counts.values()),marker=dict(colors=pleasant_colors))])


    fig.update_layout(title_text='Audio Emotions Distributions')

    return fig





def get_audio_emotions(int_id):
    data = view_INTERVIEW()
    for x in data:
        if x[0] == int_id:
             return x[2]

    
def get_int_ids(username):
    data = view_USER_INTERVIEW()
    int_ids = []
    for x in data:
        if x[0] == username:
            int_ids.append(x[1])
    return int_ids


def get_ind_audio_emotion_plot(int_id):
        return get_audio_emotion_piechart(eval(get_audio_emotions(int_id)))


def get_overall_audio_emotion_plot(username):
    overall_audio_emotions = []
    for int_id in get_int_ids(username):
        audio_emotions = get_audio_emotions(int_id)
        if audio_emotions != None:
            overall_audio_emotions.extend(eval(audio_emotions))
    return get_audio_emotion_piechart(overall_audio_emotions)





# fig = get_ind_audio_emotion_plot('INT0003')
#fig2 = get_overall_audio_emotion_plot('kishor@123')
# print(fig)



#*****************************************************Plot 2 ***********************
# Video Emotion Plot(Individual + Overall)

def get_video_emotion_piechart(category_data):



    category_counts = {category: category_data.count(category) for category in set(category_data)}

    pleasant_colors = ['#87CEEB', '#FFA07A', '#32CD32', '#FF1493', '#00FFFF', '#FFE4B5', '#20B2AA', '#E9967A', '#FFC0CB', '#ADFF2F']

    fig = go.Figure(data=[go.Pie(labels=list(category_counts.keys()), values=list(category_counts.values()),marker=dict(colors=pleasant_colors))])


    fig.update_layout(title_text='Video Emotions Distributions')
    return fig



def get_video_emotions(int_id):
    data = view_INTERVIEW()
    for x in data:
        if x[0] == int_id:
             return [y for x in eval(x[1]) for y in x]

def get_ind_video_emotion_plot(int_id):
    return get_video_emotion_piechart(get_video_emotions(int_id))


def get_overall_video_emotion_plot(username):
    overall_video_emotions = []
    for int_id in get_int_ids(username):
        video_emotions = get_video_emotions(int_id)
        if video_emotions != None:
            overall_video_emotions.extend(video_emotions)
    
    return get_video_emotion_piechart(overall_video_emotions)


# fig1 = get_ind_video_emotion_plot('INT0001')
# fig2 = get_overall_video_emotion_plot('kishor@123')
# print(fig1)
# print(fig2)


#**************************************PLot 3 ***********************

# Bar chart of factness scores over questions in an interview
def get_factness_score_plot(factness_scores):

    pleasant_colors = [
        '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
        '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
        '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5',
        '#c49c94', '#f7b6d2', '#c7c7c7', '#dbdb8d', '#9edae5',
        '#393b79', '#637939', '#8c6d31', '#843c39', '#7b4173',
        '#5254a3', '#637939', '#8c6d31', '#8c6d31', '#8c6d31'
    ]


    fig = go.Figure([go.Bar(y=factness_scores, marker_color=pleasant_colors)])


    fig.update_layout(title='Factness Scores over Each Question', xaxis_title='Questions', yaxis_title='Factness Score')


    return fig

def get_factness_scores(int_id):
    data = view_INTERVIEW()
    for x in data:
        if x[0] == int_id:
            return x[3]
def get_factness_score_barchart(int_id):
    return get_factness_score_plot(eval(get_factness_scores(int_id)))


# fig = get_factness_score_barchart('INT0010')
# print(fig)


#************************plot4 *************
# Time series plot of factness scores over questions in an interview

def get_factness_timeseries_plot(factness_scores):
    curve_color = '#FF69B4'
    fig = go.Figure(data=go.Scatter(y=factness_scores, mode='lines', line=dict(color=curve_color)))
    fig.update_layout(title='Factness Score over Questions', xaxis_title='Questions', yaxis_title='Factness Score')
    return fig
def get_factness_timeseries_curve(int_id):
    return get_factness_timeseries_plot(eval(get_factness_scores(int_id)))

# fig = get_factness_timeseries_curve('INT0003')
# print(fig)



#***********************plot5*************
# Domain Analysis: factness scores with respect to the domain(Advanced Version)


def get_domain_analysis_plot(factness_scores,domain_data):
    factness_scores = numpy.array(factness_scores)
    domain_data = numpy.array(domain_data)
    domain_factness_scores = {}
    for x in numpy.unique(domain_data):
        domain_factness_scores[x] = list(factness_scores[numpy.where(domain_data==x)])

    data = domain_factness_scores

    data_tuples = [(sub, mark) for sub, marks in data.items() for mark in marks]

    # Convert list of tuples to DataFrame
    df = pandas.DataFrame(data_tuples, columns=['Domain', 'Factness_score'])


    fig = px.bar( df ,
                 y='Factness_score', 
                 color='Domain',

                 )
    fig.update_xaxes(title_text='Domain Wise Questions')
    fig.update_yaxes(title_text = 'Factness Score')
    return fig
    
def get_factness_scores_with_domains(int_id):
    data = view_INTERVIEW()
    for x in data:
        if x[0] == int_id:
            return x[3],x[4]
        
        
def get_domain_analysis(int_id):
    factness_scores,domain_data = get_factness_scores_with_domains(int_id)
    return get_domain_analysis_plot(eval(factness_scores),eval(domain_data))

# fig = get_domain_analysis('INT0008')

# print(fig)



#***********************plot6*************

def past_analysis_plot(username,curr_int_id):
    means = []
    variences = []
    present_int_id = curr_int_id
    for x in get_int_ids(username):
        factness_scores = get_factness_scores(x)
        if factness_scores != None: 
            if x == present_int_id:
                present_mean = numpy.mean(numpy.array(eval(factness_scores)))
                present_varience = numpy.var(numpy.array(eval(factness_scores)))
            else:
                
                means.append(numpy.mean(numpy.array(eval(factness_scores))))
                variences.append(numpy.var(numpy.array(eval(factness_scores))))
                
    #means plot
    y_values = means
    x_values = [x for x in range(len(y_values))]

    # Create traces for the line segments
    trace1 = go.Scatter(x=x_values[:-1], y=y_values[:-1], mode='lines', line=dict(color='blue'),name = 'Past Interview Mean')
    trace2 = go.Scatter(x=x_values[-2:], y=y_values[-2:] + [present_mean], mode='lines', line=dict(color='green'),name = 'Current Interview Mean')

    data = [trace1, trace2]

    layout = go.Layout(title='Comparision of means of Past and current interview', xaxis=dict(title='Interviews'), yaxis=dict(title='Mean'))

    fig1 = go.Figure(data=data, layout=layout)
    fig1.update_layout(xaxis_title = 'InterviewId',yaxis_title = 'mean')


    




    #varience plots
    y_values = variences
    x_values = [x for x in range(len(y_values))]

    trace1 = go.Scatter(x=x_values[:-1], y=y_values[:-1], mode='lines', line=dict(color='yellow'),name = 'Past Interview varience')
    trace2 = go.Scatter(x=x_values[-2:], y=y_values[-2:] + [present_varience], mode='lines', line=dict(color='green'),name = 'Current Interview varience')


    data = [trace1, trace2]

    layout = go.Layout(title='Comparision of variences of Past and current interview', xaxis=dict(title='Interviews'), yaxis=dict(title='Varience'))

    fig2 = go.Figure(data=data, layout=layout)
    fig1.update_layout(title_text = 'variences',xaxis_title = 'InterviewId',yaxis_title = 'varience')

    
    # Create a figure with subplots
    combined_fig = make_subplots(rows=2, cols=1)

    # Add traces from fig1 to the first subplot
    for trace in fig1.data:
        combined_fig.add_trace(trace, row=1, col=1)

    # Add traces from fig2 to the second subplot
    for trace in fig2.data:
        combined_fig.add_trace(trace, row=2, col=1)

    # Update layout to customize subplot titles and main title
    combined_fig.update_layout(title_text='Current Interview Performance comapred to past performance')

    return combined_fig
# fig1,fig2 = past_analysis_plot('kishor@123','INT0052')

# print(fig1)
# print(fig2)



def get_recent_int_id():
    db_file = 'product_database.db'
    sql_query =  '''SELECT * FROM INTERVIEW;'''
    with sqlite3.connect(db_file) as conn:
        user_wise_filtered_data = []
        cur = conn.cursor()
        int_ids = get_int_ids(user_name)
        data = cur.execute(sql_query).fetchall()
        user_wise_filtered_data = []
        for x in data:
            if x[0] in int_ids:
                user_wise_filtered_data.append(x)
        return user_wise_filtered_data[-1][0]


@app.route('/renderplot',methods=['GET','POST'])
def render_plot():
    if request.method == "POST":
        data = request.get_json()
        plotcode = data.get('plotcode')
        if plotcode  == '1':
            plot = get_overall_audio_emotion_plot(user_name)
            return pio.to_json(plot, pretty=True)
        elif plotcode == "2":
            plot = get_overall_video_emotion_plot(user_name)
            return pio.to_json(plot, pretty=True)
        
        elif plotcode == '3':
            plot = past_analysis_plot(user_name,get_recent_int_id())
            return pio.to_json(plot, pretty=True)




def get_data_for_ind_interview_analysis(username):  
    data = view_INTERVIEW()
    specific_data = []
    for int_id in get_int_ids(username):
        temp = []
        for int_data in data:
            if int_id == int_data[0]:
                temp.append(int_data[0])
                temp.append(int_data[-1])
        if(len(temp)):
            specific_data.append(temp)
    return specific_data


@app.route('/renderinddata',methods=['GET','POST'])
def render_ind_data():
    if request.method == "GET":
        return get_data_for_ind_interview_analysis(user_name)


@app.route('/renderindplots',methods=['GET','POST'])
def render_ind_plots():
    if request.method == "POST":
        data = request.get_json()
        plotcode = data.get('plotcode')
        int_id = data.get('int_id')
        if plotcode == '1':
            plot = get_ind_audio_emotion_plot(int_id)
            return pio.to_json(plot, pretty=True)
        elif plotcode == '2':
            plot = get_ind_video_emotion_plot(int_id)
            return pio.to_json(plot, pretty=True)
        elif plotcode == '3':
            plot = get_factness_score_barchart(int_id)
            return pio.to_json(plot, pretty=True)
        elif plotcode == '4':
            plot = get_factness_timeseries_curve(int_id)
            return pio.to_json(plot, pretty=True)
        elif plotcode == '5':
            plot = get_domain_analysis(int_id)
            return pio.to_json(plot, pretty=True)

    
def view_User_Question_Data():
    db = 'product_database.db'
    query = '''Select * from User_Question_Data'''
    with sqlite3.connect(db)as conn:
        cursor = conn.cursor()
        data = cursor.execute(query).fetchall()
        return data


def insert_User_Question_Data(int_id,questions,answers,domains):
    db = 'product_database.db'
    query = '''INSERT INTO User_Question_Data VALUES(?,?,?,?)'''
    with sqlite3.connect(db)as conn:
        cursor = conn.cursor()
        cursor.execute(query,(int_id,str(questions),str(answers),str(domains)))
        conn.commit()

def generate_insert_questions_to_db(domains,num_questions,int_id):
    question_answer_domain_data =[]
    for domain in domains:
        questions,answers = generate_questionanswerpair(domain,num_questions)
        for (question,answer) in zip(questions,answers):
            question_answer_domain_data.append([question,answer,domain])
    question_answer_domain_data = random.sample(question_answer_domain_data,num_questions)
    insert_User_Question_Data(int_id,[x[0] for x in question_answer_domain_data],[x[1] for x in question_answer_domain_data],[x[2] for x in question_answer_domain_data])
    return [x[0] for x in question_answer_domain_data]



def get_next_ID(prev_id):
    if  prev_id == 'INT000':
        return 'INT001'
    digits = prev_id.split('INT')[1]

    for x in range(len(digits)):
        if digits[x] == '0':
            continue
        else:
            return  'INT' + str(digits[:x]) + str(int(digits[x:]) + 1)


def insertinto_USER_INTERVIEW(username,interviewid):
    db_file = 'product_database.db'
    sql_query = '''INSERT INTO USER_INTERVIEW (Username, InterviewID) VALUES (?, ?)'''
    with sqlite3.connect(db_file) as conn:
        cur = conn.cursor()
        cur.execute(sql_query,(username,interviewid))
        conn.commit()


def insertinto_INTERVIEW(InterviewID,VideoEmotions,AudioEmotions,FactnessScore,Domain,LEVEL,TIMESTAMP):
    db_file = 'product_database.db'
    sql_query = '''INSERT INTO INTERVIEW VALUES (?, ?, ?, ?, ?,?,?)'''
    with sqlite3.connect(db_file) as conn:
        cur = conn.cursor()
        cur.execute(sql_query,(InterviewID,VideoEmotions,AudioEmotions,FactnessScore,Domain,LEVEL,TIMESTAMP))
        conn.commit()

def get_fullname(username):
    for x in view_USER():
        if x[0] == username:
            return str(x[2]) + ' '+ str(x[3])
if __name__ == '__main__':
    app.run(debug=True)

