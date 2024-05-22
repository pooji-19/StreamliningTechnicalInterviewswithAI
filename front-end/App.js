import './App.css';
import Acceptfile from './components/acceptfile';
import {Routes,Route} from 'react-router-dom'
// import MainPage from './components/mainpage';
import Dashboard from './components/dashboard';
import Videocapture from './components/videocapture';
// import Home from './components/home';
// import { AuthProvider } from './components/auth';
// import SignIn from './login';
// import SignUp from './components/signup';
// import Producthome from './components/producthome';
// import UserHome from './components/userHome';
import OverallAnalysis from './components/sampleplots';
import IndividualPlot from './components/individual_int_plots';
// here
import Home from './components/Home/index';
import Contactform from './components/ContactForm';
import FAQ from './components/FAQ';
import SignIn from './components/SignIn/index'
import { AuthProvider } from './components/auth';
import MainPage from './components/MainPage/mainpage';
import SignUp from './components/SignUp/index';
import PreInterview from './components/PreInterview';
import VideoPage from './components/Videopage/index';
import IndividualDashboard from './components/IndividualDashboard/index';
import OverallDashboard from './components/OverallDashboard/index';
import IndividualAnalysisPlots from './components/IndividualAnalysisPlots/index';
import Guidelines from './components/Guidelines/index'



function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Routes>
        {/* <Route path = '/' element = {<Producthome/>}></Route>
        <Route path = '/preinterview' element = {<Acceptfile/>}></Route>
        <Route path = '/interview' element = {<MainPage/>}></Route>
        <Route path = '/home' element = {<UserHome/>}></Route>
        <Route path = '/dashboard' element = {<Dashboard/>}></Route>
        <Route path = '/videocapture' element = {<Videocapture/>}></Route>
        <Route path = '/login' element = {<SignIn/>}></Route>
        <Route path = '/signup' element = {<SignUp/>}></Route>
        <Route path = '/overallanalysis' element = {<OverallAnalysis/>}></Route>
        <Route path = '/individualanalysis' element = {<IndividualPlot/>}></Route> */}
        {/* started here gelkadam */}
        <Route path = '/' element = {<Home/>}></Route>
        <Route path="/ContactForm" element={<Contactform/>}/>
        <Route path="/FAQ" element={<FAQ/>}/>
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path = "/Mainpage" element= {<MainPage/>}/>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/PreInterview" element={<PreInterview/>}/>
        <Route path="/VideoPage" element={<VideoPage/>}/>
        <Route path="/IndividualDashboard" element={<IndividualDashboard/>}/>
        <Route path="/OverallDashboard" element={<OverallDashboard/>}/>
        <Route path="/IndividualAnalysisPlots" element ={<IndividualAnalysisPlots/>}/>
        <Route path='/Guidelines' element={<Guidelines/>}/>
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
