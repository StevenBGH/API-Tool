import React, { useEffect, useState } from "react";
import './list.css'
import FetchKBConvRequest from "./getOneKBConv";



function FetchGetRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [baseList, setBaseList] = useState([]);
  const [selectedKBId, setSelectedKBId] = useState(null); // State to store selected knowledge base ID
  const [selectedKBName, setSelectedKBName] = useState(null); // State to store selected knowledge base ID
  
  const apiKey = process.env.REACT_APP_API_KEY
  

  useEffect(() => {
    const fetchData = () => {
    setIsLoading(true);
    fetch('https://api.dante-ai.com/knowledge-bases/', {
      
      method: 'GET',
      headers: {
        'x-api-key': `${apiKey}`,
      }
    })
    .then(response => response.json())
    .then(json => {
      setBaseList(json.results);
      setIsLoading(false);
    })
    .catch(error => {
      console.error("Error fetching knowledge bases:", error);
      setIsLoading(false);
    });
  }
  fetchData()
    // Set up an interval to fetch data periodically
    

    // Clean up the interval when component unmounts
    
  }, [apiKey]);

  

  function handlerChooseKB(idNum,baseName) {
    setSelectedKBId(idNum); // Update selected knowledge base ID
    
    setSelectedKBName(baseName);
  }
  function handlerRefresh() {
    setIsLoading(true);
    fetch('https://api.dante-ai.com/knowledge-bases/', {
      
      method: 'GET',
      headers: {
        'x-api-key': `${apiKey}`,
      }
    })
    .then(response => response.json())
    .then(json => {
      setBaseList(json.results);
      setIsLoading(false);
    })
    .catch(error => {
      console.error("Error fetching knowledge bases:", error);
      setIsLoading(false);
    });  
  }

  return (
<div className="App">
  <div className="App-main">
    <div className="App-Sidebar">
      {/* Sidebar content */}
      <h3>Knowledge Base List</h3>
      <button onClick={()=> handlerRefresh()}>Refesh</button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {baseList.map((base, index) => (
            <button className="lists" key={index} onClick={() => handlerChooseKB(base.knowledge_base.id,base.knowledge_base.knowledge_base_name)}>
              <div className="botName">Bot Name: {base.knowledge_base.knowledge_base_name}</div>
              <div className="botId">Bot id: {base.knowledge_base.id}</div>
            </button>
          ))}
        </div>
      )}
    </div>
    
      
    </div>
  
  <div>
    {/* Render FetchKBConvRequest component if a knowledge base is selected */}
    {selectedKBId && selectedKBName && <FetchKBConvRequest id={selectedKBId} name={selectedKBName} />}
  </div>
 
</div>


    
    
    
  );
}

export default FetchGetRequest;

