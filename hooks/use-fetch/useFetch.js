import { useState, useEffect } from 'react'
import axios from 'axios'
// util
import { apiGET } from './options'

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // const options = {
  //   method: 'GET',
  //   url: `https://jsearch.p.rapidapi.com/${endpoint}`,
  //   params: { ...query },
  //   headers: {
  //     'X-RapidAPI-Key': GLOBAL.API_KEY,
  //     'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  //   },
  // }

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const response = await axios.request(apiGET('GET', endpoint, query))
      console.log(response.data)
      setData(response.data.data)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetchData()
  }

  return { data, isLoading, error, refetch }
}

export default useFetch
