import { authUrl } from "./urlsBase";



export const createNewUser = async ( data ) => {

  try {
    const response = await fetch(`${ authUrl }/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
    
  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      message: error.message,
    }
  }
}


export const login = async ( data ) => {
  try {
    const response = await fetch(`${ authUrl }/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();

  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      message: error.message,
    }
  }
}

export const resetPassword = async ( data ) => {
  try {
    const response = await fetch(`${ authUrl }/reset-password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();

  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      message: error.message,
    }
  }
}

export const sendEmailToResetPassword = async (data) => {

  try {
    const response = await fetch(`${ authUrl }/forgot-password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();

  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      message: error.message,
    }
  }

}