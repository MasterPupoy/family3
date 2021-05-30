import './App.css';
import Sidebar from './components/Sidebar';
import EverybodyContainer from './components/EverybodyContainer';


function App() {
  return (
    <div className="App">
      <div className="sideBar">
        <Sidebar />
      </div>
      <div className="main">
        <EverybodyContainer />
      </div>
      
    </div>  
  );
}

export default App;
