import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
      ? 'https://api-jobsmanager.herokuapp.com/api'
      : 'http://localhost:3333/api'
})

export const fetched = axios.create({
  baseURL: 'http://localhost:3000'
})
