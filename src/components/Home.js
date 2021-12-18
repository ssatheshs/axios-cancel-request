import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Button } from "react-bootstrap"
import '../App.css'
import axios from 'axios'
import { instance } from '../apis/AxiosInstance'
import Status from './Status'


const Home = () => {
    const [ axiosRes, setAxiosRes] = useState("")
    let cancelToken

    const handleRequest = async () => {
      
      
      console.log( cancelToken)
      if( typeof cancelToken != typeof undefined ){
        cancelToken.cancel("axios request cancelled")
        setAxiosRes('Request cancelled')
      }

      cancelToken = axios.CancelToken.source()
      try {
        
          await instance.get("/photos", {
            cancelToken: cancelToken.token,
          })
          await instance.get("/albums", {
            cancelToken: cancelToken.token,
          })
          await instance.get("/photos", {
            cancelToken: cancelToken.token,
          })
          await instance.get("/todos", {
            cancelToken: cancelToken.token,
          })
        setAxiosRes('Success')
        
      } catch (error) {
        console.log(error)
        cancelToken.cancel("axios request cancelled from catch")
        setAxiosRes('Request cancelled')
      }
      
    }

    return(
        <div className="App">
            <header className="App-header" id='btn'>
              <p>Double Click to cancel Request</p>
              <Button onClick = { handleRequest }>Request</Button><br/>
                
              <Status axiosRes = {axiosRes} />             
            </header>                            
        </div>
    )
}

export default Home