import axios from 'axios'

const httpClient = axios.create({
  baseURL: 'https://my-finances-api.herokuapp.com'
});

class Api {

  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  post(url, object) {
    const requestUrl = `${this.apiUrl}${url}`
    return httpClient.post(requestUrl, object);
  }

  put(url, object) {
    const requestUrl = `${this.apiUrl}${url}`
    return httpClient.put(requestUrl, object);
  }

  delete(url) {
    const requestUrl = `${this.apiUrl}${url}`
    return httpClient.delete(requestUrl);
  }

  get(url) {
    const requestUrl = `${this.apiUrl}${url}`
    return httpClient.get(requestUrl);
  }
}

export default Api;