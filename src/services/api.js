import axios from 'axios'

const api = axios.create({
    baseURL: 'https://logistica-rs.com.br/'
})

export default api