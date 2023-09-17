import { GLOBAL } from '../../config'

export const apiGET = (method = 'GET', endpoint, query) => ({
  method,
  url: `https://jsearch.p.rapidapi.com/${endpoint}`,
  params: { ...query },
  headers: {
    'X-RapidAPI-Key': GLOBAL.API_KEY,
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  },
})
