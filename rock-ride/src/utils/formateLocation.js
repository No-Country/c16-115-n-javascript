


export const formateLocation = (location) => { 
  if ( location.city !== location.stateOrProvince ) {
    return `${location.city}, ${location.stateOrProvince}, ${location.country}`;
  } 
  return `${location.city}, ${location.country}`;
}