import dotenv from "dotenv";
dotenv.config();

import { Client } from "@googlemaps/google-maps-services-js";


const googleMapsClient = new Client({ key: process.env.GOOGLE_MAPS_API_KEY })

export const useLocation = async ( address, city, province, country ) => {

  const args = {
    params: {
      key: process.env.GOOGLE_MAPS_API_KEY,
      address: `${ address }, ${ city }, ${ province }, ${ country }`,
    }
  };

  const response = await googleMapsClient.geocode(args)
  const location = response.data.results[0];
  
  console.log(location);



  if (location !== undefined) {

    const addressExtract = extractStreetInfoFromGoogleResponse(location)

    if ( addressExtract.streetName === null ) {
      return { ok: false, message: "Address not found" }
    } else {
      const streetName = addressExtract.streetName;
      const streetNumber = addressExtract.streetNumber;
      const city = extractCityFromGoogleResponse(location);
      const coordinates = location.geometry.location;
      const stateOrProvince = extractStateFromGoogleResponse(location);
      const country = extractCountryFromGoogleResponse(location);
      console.log("Address: ", address);
      console.log("City: ", city);
      console.log("Province: ", stateOrProvince);
      console.log("Country: ", country);
    
      return {
        ok: true,
        streetNameGoogle: streetName,
        streetNumberGoogle: streetNumber,
        cityGoogle: city,
        coordinates, 
        stateOrProvince,
        country,
      }
    }

  } else {
    console.log("No location found");
    return {
      ok: false,
      message: "No location found"
    }
  }


}




function extractStreetInfoFromGoogleResponse(googleResponse) {
  let streetInfo = {
    streetName: null,
    streetNumber: null,
  };

  for (const component of googleResponse.address_components) {
    if (component.types.includes('route')) {
      streetInfo.streetName = component.long_name;
    } else if (component.types.includes('street_number')) {
      streetInfo.streetNumber = component.long_name;
    }

    // Termina la iteración si se han encontrado ambos
    if (streetInfo.streetName && streetInfo.streetNumber) {
      break;
    }
  }

  return streetInfo;
}


function extractCityFromGoogleResponse(googleResponse) {
  let city = null;

  for (const component of googleResponse.address_components) {
    if (component.types.includes('locality')) {
      city = component.long_name;
      break; // Termina la iteración si se encuentra el nombre de la ciudad
    }
  }

  return city;
}


function extractCountryFromGoogleResponse(googleResponse) {
  let country = null;

  for (const component of googleResponse.address_components) {
    if (component.types.includes('country')) {
      country = component.long_name;
      break; // Termina la iteración si se encuentra el país
    }
  }

  return country;
}

function extractStateFromGoogleResponse(googleResponse) {
  let state = null;

  for (const component of googleResponse.address_components) {
    if (component.types.includes('administrative_area_level_1')) {
      state = component.long_name;
      break; // Termina la iteración si se encuentra la provincia o estado
    }
  }

  return state;
}


