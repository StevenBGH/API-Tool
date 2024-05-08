import React, { useEffect, useState } from "react";
import './list.css'
import FetchKBConvRequest from "./getOneKBConv";
import Dropdown from 'react-bootstrap/Dropdown'


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
    
  }, []);

  console.log(baseList);

  function handlerChooseKB(idNum,baseName) {
    setSelectedKBId(idNum); // Update selected knowledge base ID
    console.log(baseName)
    setSelectedKBName(baseName);
  }

  return (
    <div className="App-Main">
    <div className="App-Sidebar">
      <h1>Knowledge Base List</h1>
      <div className="App-Sidebar">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Dropdown show={true}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Display List
            </Dropdown.Toggle>
            <Dropdown.Menu >
          {baseList.map((base, index) => (
            <Dropdown.Item >
            <button className="lists" key={index} onClick={() => handlerChooseKB(base.knowledge_base.id,base.knowledge_base.knowledge_base_name)}>
              <div className="botName">Bot Name: {base.knowledge_base.knowledge_base_name}</div>
              <div className="botId">Bot id: {base.knowledge_base.id}</div>
            </button>
            </Dropdown.Item>
          ))}
          </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
      </div>
      <div>
      {/* Render FetchKBConvRequest component if a knowledge base is selected */}
      <div className="App-Next">
      {selectedKBId && selectedKBName && <FetchKBConvRequest id={selectedKBId} name={selectedKBName} />}

      </div>
    </div>
    </div>
    </div>
  );
}

export default FetchGetRequest;

