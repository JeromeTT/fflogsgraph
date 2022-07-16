import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { useSearchParams } from "react-router-dom";
import Header from './components/Header';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userName, setUserName] = useState("")
  useEffect(() => {
    // Code Authorization
    if(!searchParams.get("code")) {
      return
    }
    const options = {
      method: 'POST',
      url: process.env.FFLOGS_TOKEN_URL,
      headers: {'Content-Type': 'multipart/form-data'},
      data: {
        client_id: process.env.APP_ID,
        code_verifier: searchParams.get("state"),
        redirect_uri: process.env.BASE_URL,
        grant_type: 'authorization_code',
        code: searchParams.get("code")
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      localStorage.setItem("token", JSON.stringify(response.data));
      window.location.replace(process.env.BASE_URL);
    }).catch(function (error) {
      console.error(error);
    });
  },[])

useEffect(() => {
  //Check if token is present locally
  const savedToken = localStorage.getItem("token")
  if (!savedToken) {
    return
  };

  const parsedToken = JSON.parse(savedToken);
  const options = {
    method: 'POST',
    url: 'https://www.fflogs.com/api/v2/user',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${parsedToken.access_token}`
    },
    data: '{"query":"{userData{currentUser{name}}}"}'
  };
  axios.request(options).then(function (response) {
    setUserName(response.data.data.userData.currentUser.name);
    console.log(response.data.data.userData.currentUser.name)
  }).catch(function (error) {
    console.error(error);
  });
  
},[])
  return (
    <div className="App">
      <Header name={userName}/>
    </div>
  );
};

export default App;
