import axios from 'axios';

export const fetchURI = async uri => {
    debugger
    let resp  = await axios.get(uri)
    .then(response => {
      console.log("🚀 ~ file: getDataFromURL.js ~ line 7 ~ response", response.data) 
    })
    .catch(error => {
      console.log("🚀 ~ file: getDataFromURL.js ~ line 10 ~ error", error.body)
    })
    console.log("🚀 ~ file: getDataFromURL.js ~ line 6 ~ resp", resp)
    
    // try {
    //   resp = await axios.get(`https://sheltered-crag-76748.herokuapp.com/${uri}`)
    //   console.log(resp.data)
    //   return resp.data
    // } catch (error) {
    //   console.log(error)
    // }
  }