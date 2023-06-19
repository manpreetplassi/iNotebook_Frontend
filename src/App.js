import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from "./context/notes/NoteState";


import Navbar from './components/Navbar'
import About from './components/About'
import Signup from './components/Signup'
import Home from './components/Home'
import Login from './components/Login'
import UserProfile from './components/UserProfile';
import Help from './components/Help';

function App() {
  

  
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/help" element={<Help />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/userProfile" element={<UserProfile/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
