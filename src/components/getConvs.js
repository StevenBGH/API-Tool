import React, { useEffect, useState } from "react";
import DeleteMessages from "./postDelete";
import '../App.css';

function FetchConvRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [baseList, setBaseList] = useState([]);
  const [toBeDeleted, setToBeDeleted] = useState([]);
  const [needToDelete, setNeedToDelete] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.dante-ai.com/conversations/?kb_id=31649404-5edb-43db-8c51-f2fcb9eed414&limit=1000`, {
      method: 'GET',
      headers: {
        'x-api-key': `${apiKey}`,
      }
    })
    .then(response => response.json())
    .then(json => {
      setBaseList(json.results);
      setIsLoading(false);

      const deleteMe = []; // Create a local array
      for (let i = 0; i < json.results.length; i++) {
        const givenDateString = json.results[i].date_updated;
        const givenDate = new Date(givenDateString);
        const currentDate = new Date();
        const differenceInMs = currentDate - givenDate;
        const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
        
        if (differenceInDays > 30) {
          deleteMe.push(json.results[i]);
        }
      }
      setToBeDeleted(deleteMe); // Update the state after the loop

      if (deleteMe.length > 0) {
        setNeedToDelete(true);
      }
    })
    .catch(error => {
      console.error("Error fetching conversations:", error);
      setIsLoading(false);
    });
  }, []);

  function handlerDeleteOld (messages) {
    console.log("About to delete")
    console.log(messages)
    DeleteMessages(messages)
  }
  return (
    <div className="App-Next">
      <h1>90 day deletion tool</h1>
      
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          Found {toBeDeleted.length} conversations older than 30 days. Press Button to delete them.
        </div>
      )}

      {needToDelete ? (
        <div>
          <button onClick={() => handlerDeleteOld(toBeDeleted)}>Press to delete</button>

        </div>
      ) : (
        <div>
          <h2>No conversations older than 30 days found</h2>
        </div>
      )}
    
    </div>
  );
}

export default FetchConvRequest;