import axios from 'axios'

const Axios = axios.create({
  baseURL: 'https://full-stack-clothing-store.onrender.com/api/',
})

export default Axios;
