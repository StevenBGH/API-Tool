
import './App.css';
import FetchGetRequest from './components/getKB';


import React, {useState } from "react";


function App() {
  const [isBotsLoading, setIsBotsLoading] = useState(false);

  

  function handlerGetKB () {   
    
    
    setIsBotsLoading(true)
  }



  return (
    <div>
    <div className="App-header">
      <h1>GC GenAI Chatbot API Tool</h1>
      <button onClick={handlerGetKB}>Press to connect to Dante API</button>
      </div>
      <div className="App-Main">
      
      
      
      
      <div>
      {isBotsLoading ? (
        <div><FetchGetRequest /></div>
      ) : (
        
        <div>
          <h2>Awaiting Connection...</h2>
          </div>)}
          </div>
         
          
          
          <div>
         
        </div>
        </div> 
      
      
    </div>
  );
}

export default App;
