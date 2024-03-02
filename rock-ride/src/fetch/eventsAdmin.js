import { baseUrl } from "./urlsBase"



export const getAllEvents = async () => {
    try {

      const response = await fetch(`${baseUrl}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
      },
    })

    const data = await response.json()
    return data.events
      
    } catch (error) {
      console.log(error.emssage);
    }
    
}

export const createNewEvent = async (formData) => {
  try {
    const response = await fetch(`${baseUrl}/events/create`, {
      // method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      //   'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
      // },
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
      },
      body: formData
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    // Manejar los errores de la petición
    console.error('Error al crear evento:', error);
    throw error;
  }
}


export const getEventById = async (id) => {

  const response = await fetch(`${baseUrl}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
  },
  })

  const data = await response.json()
  return data

}