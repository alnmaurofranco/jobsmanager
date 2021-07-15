import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    && process.env.apiURLHost === 'heroku'
    ? 'https://api-jobsmanager.herokuapp.com/api'
    : 'http://localhost:3333/api'
})
