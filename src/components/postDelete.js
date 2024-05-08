


function DeleteMessages(messages) {
    console.log("Ready to Delete")
    
    for (let i=0; i<messages.length; i++)  {  
        console.log(messages[i].id)
        fetch(`https://api.dante-ai.com/conversations/${messages[i].id}`, {
          method: 'DELETE',
          headers: {
            'x-api-key': 'DANTE_PUBLIC_c49744cf96d2f4ce439570384fcb763315acf9cb23718406cba9966174665695',
          }
        })
        .then(response => response.json())
        
        .catch(error => {
          console.error("Error fetching knowledge bases:", error);
          
        });}
      
}
export default DeleteMessages 