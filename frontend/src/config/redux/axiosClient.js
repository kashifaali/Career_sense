
import axios from 'axios';

const clientServer = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' }
});

export default clientServer;