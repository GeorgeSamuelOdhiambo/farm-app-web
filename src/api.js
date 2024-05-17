import axios from 'axios';

const userData = JSON.parse(sessionStorage.getItem('userData'));

const Axios = axios.create({
  baseURL: 'https://ambiguous-woolen-hell.glitch.me/',
  headers: {
    Authorization: `Bearer ${userData ? userData.token : ''}`
  }
});

export default Axios;
