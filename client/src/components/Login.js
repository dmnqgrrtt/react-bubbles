import React, {useState} from "react";
import axios from 'axios'
import {useHistory} from 'react-router-dom';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const {push} = useHistory();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value })

  };
  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", credentials)
    .then(res => {
        console.log("login, post", res)
        localStorage.setItem("token", res.data.payload)
        push("/bubbles");
    })
    .catch(err => {
        console.log("err", err)
    })
}

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <p>Please Login Below</p>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input 
          type="password" 
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit" className='login-button'>Login</button>
      </form>
    </div>
  );
};

export default Login;
