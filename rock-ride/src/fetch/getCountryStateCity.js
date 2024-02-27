import { countriesUrl } from "./urlsBase";

const headers = new Headers()

headers.append("X-CSCAPI-KEY", import.meta.env.API_KEY)

const requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
}


export const getAllCountries = async () => {
  try {
    const response = await fetch(countriesUrl, requestOptions);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
    return []
  }
}


export const getProvincesByCountry = async (country) => {

  try {
    const response = await fetch(`${countriesUrl}/${country}/states`, requestOptions);
    const data = await response.json();

    return data; 
  } catch (error) {
    console.log(error.message);
    return []
  }
}


export const getCitiesByProvince = async (country, province) => {

  try {

    const response = await fetch(`${countriesUrl}/${country}/states/${province}/cities`, requestOptions);

    const data = await response.json();

    return data

  } catch (error) {
    console.log(error.message);
    return []
  }
}
