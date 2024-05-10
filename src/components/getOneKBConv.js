import './list.css'
import { useState, useEffect } from "react";
import DeleteMessages from "./postDelete";
import CloneKnowladgeBase from "./clone.js"

function FetchKBConvRequest({ id, name }) {
  const [isLoading, setIsLoading] = useState(false);
   // eslint-disable-next-line
  const [baseList, setBaseList] = useState([]);
  const [toBeDeleted, setToBeDeleted] = useState([]);
  const [needToDelete, setNeedToDelete] = useState(false);
  
  const apiKey = process.env.REACT_APP_API_KEY
  
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.dante-ai.com/conversations/?kb_id=${id}&limit=1000`, {
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
        setNeedToDelete(true)} else {setNeedToDelete(false)};
      
    })
    .catch(error => {
      console.error("Error fetching conversations:", error);
      setIsLoading(false);
    });
     // eslint-disable-next-line
  }, [id]);

  function handlerDeleteOld (messages) {
    
    DeleteMessages(messages)
  }
 
  return (
    <div> 
      
      
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          
        </div>
      )}

      {needToDelete ? (
        <div>
          <div className="botName">KB Name: {name}</div>
          <div className="botID">KB id: {id}</div>
          Found {toBeDeleted.length} conversations older than 30 days. Press Button to delete them.
          <br></br>
          <button onClick={() => handlerDeleteOld(toBeDeleted)}>Press to delete</button>

        </div>
      ) : (
        <div>
          <div className="botName">KB Name: {name}</div>
          <div className="botID">KB id: {id}</div>
          <h2>No conversations older than 30 days found</h2>
        </div>
      )}
      <br></br>
      <h3>To create a clone of this Chatbot press button below</h3>
      
      

      <CloneKnowladgeBase kBId={id} kbName={name} />
    </div>
  );
}
export default FetchKBConvRequest;

