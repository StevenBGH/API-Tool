

import React, { useEffect, useState } from "react";

// function FetchConvRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [baseList, setBaseList] = useState([]);
  const [toBeDeleted, setToBeDeleted] = useState([]);
  const [needToDelete, setNeedToDelete] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.dante-ai.com/conversations/?kb_id=31649404-5edb-43db-8c51-f2fcb9eed414&limit=1000`, {
      method: 'GET',
      headers: {
        'x-api-key': 'DANTE_PUBLIC_c49744cf96d2f4ce439570384fcb763315acf9cb23718406cba9966174665695',
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

  return (
    <div className="App">
      <h1>GenAIChat Tool</h1>
      
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {toBeDeleted.map((item, index) => (
            <div key={index}>
              <h2>Name: {item.name}</h2>
              <h5>Date Updated: {item.date_updated}</h5>
            </div>
          ))}
        </div>
      )}

      {needToDelete ? (
        <div>We need to delete some</div>
      ) : (
        <div>
          <h2>Nothing to delete</h2>
        </div>
      )}
    </div>
  );
// }

// export default FetchConvRequest;

