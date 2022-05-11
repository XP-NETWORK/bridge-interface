import axios from 'axios';

export const fetchURI = async uri => {
    debugger
    let resp  = await axios.get(uri)
    .then(response => {
    })
    .catch(error => {
    })
    
 
  }