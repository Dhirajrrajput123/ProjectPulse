import logo from './logo.svg';
import './App.css';
import Header from './components/Header';

import Manager from './components/Manager';
import Project from './components/Project';
import Task from './components/Task';
import Resource from './components/Resource';
import Error from './components/Error';
import Help from './components/Help';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import All_routs from './All_Routs/All_routs';




function App() {
  return (
    // <Header/>
    // <Router>
    //      <Header/>
    //       <Routes>
         

    //       {/* Manager */}
    //          <Route path="/manager" element={<Manager/>}/>

    //       {/* About   */}
    //          <Route path="/project" element={<Project/>} />

    //       {/* contect        */}
    //           <Route path="/task" element={<Task/>}/>

    //       {/* help      */}
    //           <Route path="/resource" element={<Resource/>}/>

    //       {/* Help */}
    //           <Route path="/help" element={<Help/>}/>
    //       {/* Error      */}
    //           <Route path="*" element={<Error/>}/>
    //      </Routes>
    // </Router>
    
   <All_routs/>
  );
}

export default App;
