import React, { useState, useEffect } from "react";

function CloneKnowladgeBase({ kB }) { // Destructure kB from props
    const [clonedKB, setClonedKB] = useState([]);
    const [waitForClone, setWaitForClone] = useState(false);

    useEffect(() => {
        if (kB && kB.length > 0) { // Check if kB has contents
            setWaitForClone(true);
            const apiKey = process.env.REACT_APP_API_KEY;
            fetch(`https://api.dante-ai.com/knowledge-bases/v2/duplicate_kb/${kB}`, {
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
            .catch(error => {
                console.error("Error fetching knowledge bases:", error);
            });
        } else {
            setWaitForClone(false);
        }
    }, [kB]);
   
    return (
        <div>
            {waitForClone ? <>Cloned - New KB created: {clonedKB.knowledge_base.knowledge_base_name}
            <br></br>
            <h3>Refresh page -F5- to reload Knowledge Base List </h3> </> : <>--</>}
           
        </div>
    );
}

export default CloneKnowladgeBase;
