
import axios from 'axios';

const clientServer = axios.create({
  baseURL: 'https://career-sense.onrender.com',
  headers: { 'Content-Type': 'application/json' }
});

export default clientServer;