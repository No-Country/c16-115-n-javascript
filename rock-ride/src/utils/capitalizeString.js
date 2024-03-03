

export const capitalizeString = (str) =>{
  // Verificar si la cadena es válida
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  // Capitalizar la primera letra y concatenar el resto de la cadena
  return str.charAt(0).toUpperCase() + str.slice(1);
}