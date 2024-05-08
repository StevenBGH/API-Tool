
import './App.css';
import FetchGetRequest from './components/getKB';
import FetchConvRequest from './components/getConvs';
//import { Button, EditableText } from "@blueprintjs/core"
import React, { useEffect, useState } from "react";


function App() {
  const [isBotsLoading, setIsBotsLoading] = useState(false);
  const [isConvsLoading, setIsConvsLoading] = useState(false)
  const [baseList, setBaseList] = useState([]);
  const [kbase, setKbase] = useState([]);
  

  function handlerGetKB () {
    
    console.log("I am here")
    
    setIsBotsLoading(true)
  }

  function handlerGetConv() {
   console.log("handler for convs")
   setIsConvsLoading(true)
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