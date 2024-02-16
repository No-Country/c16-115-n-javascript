import dotenv from "dotenv";
dotenv.config();

import { Client } from "@googlemaps/google-maps-services-js";


const googleMapsClient = new Client({ key: process.env.GOOGLE_MAPS_API_KEY })

export const useLocation = async ( address, city ) => {
  const args = {
    params: {
      key: process.env.GOOGLE_MAPS_API_KEY,
      address: `${address}, ${city}`,
    }
  };
  const locationData = await googleMapsClient
   .geocode(args)
   .then((response) => {
  
    const location = response.data.results[0];
  
    return location
  })
  .catch((error) => {
    console.log(error.response.data.error_message);
  })

  const coordinates = locationData.geometry.location;
  const country = locationData.address_components[3].long_name;

  return {
    coordinates, 
    country
  }

}
