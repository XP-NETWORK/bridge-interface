import axios from 'axios';

export const fetchURI = async uri => {
    debugger
    let resp
    try {
      resp = await axios.get(`https://sheltered-crag-76748.herokuapp.com/${uri}`)
      console.log(resp.data)
      return resp.data
    } catch (error) {
      console.log(error)
    }
  }