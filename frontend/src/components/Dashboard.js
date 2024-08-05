import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{


  const refreshToken = async() => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if(error.response){
        navigate('/');
      }
    }
  };
  refreshToken();
}, [navigate])

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async(config) => {
    const currenDate = new Date();
    if(expire * 1000 < currenDate.getTime()){
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error)=>{
    return Promise.reject(error);
  } );

  const getUsers = async() => {
    const response = await axiosJWT.get('http://localhost:5000/users', {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(response.data);
  }
  return (
    <div>
        <Navbar />
      <h1 className='container mt-5'>Welcome Back: {name}</h1>
      <button onClick={getUsers} className='button is-info'>Get Users</button>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard
