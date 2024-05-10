import React, { useState } from "react";

function CloneKnowladgeBase({ kBId, kbName }) { // Destructure kB from props
    const [clonedKB, setClonedKB] = useState([]);
    const [waitForClone, setWaitForClone] = useState(false);
   
    
    console.log(kBId, kbName)
    function handlerClone(id) {
        if (kBId) { // Check if kB has contents
            console.log(kBId)
            const apiKey = process.env.REACT_APP_API_KEY;
            fetch(`https://api.dante-ai.com/knowledge-bases/v2/duplicate_kb/${kBId}`, {
                method: 'POST',
                headers: {
                    'x-api-key': apiKey,
                }
            })
            .then(response => response.json())
            .then(json => {
                setClonedKB(json.results);
            })
            .then  (console.log(clonedKB))
            .then (setWaitForClone(true))
            .catch(error => {
                console.error("Error fetching knowledge bases:", error);
            });
        } else {
            setWaitForClone(false);
        }
    };
   
    return (
        <div>
            <button onClick={() => handlerClone()}>Press to Clone Bot</button>

            {waitForClone ? <div>Cloned - New KB created from: {kbName}
            <br></br>
            <h3>Press Refresh to reload KB list</h3> </div> : <>--</>}
           
        </div>
    );
}

export default CloneKnowladgeBase;
