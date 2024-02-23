import { countriesUrl } from "./urlsBase";



const headers = new Headers()

headers.append("X-CSCAPI-KEY", "API_KEY")

const requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
}

export const getProvincesByCountry = async (country) => {

  try {
    const response = await fetch(`${countriesUrl}/${country}`, requestOptions);
    const data = await response.json();
    
    console.log(data.data);
    
  } catch (error) {
    console.log(error.message);
    return []
  }
}