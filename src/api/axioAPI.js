import axios from 'axios';

export default axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  data: {}
});