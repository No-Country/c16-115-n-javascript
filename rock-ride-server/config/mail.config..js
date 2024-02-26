import nodemailer from 'nodemailer'


import dotenv from 'dotenv'

dotenv.config()



const mail = {
  user: process.env.GMAIL_ACCOUNT,
  pass: process.env.GMAIL_PASS
}


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  tls: {
    rejectUnauthorized: false
  },
  secure: false,
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});


export const sendEmail = async (to, subject, html) => {

  try {

    await transporter.sendMail({
      from: `"Drive Rock 👻" <${mail.user}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text: "Hello world?", // plain text body
      html, // html body
    });

  } catch (error) {
    console.log('Algo no salio bien al enviar el email');
  }

}


export const getTemplate = (name, token) => {

  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recover Account</title>
</head>
  <body style="margin: 0; padding: 0; box-sizing: border-box;">
    <div style="max-width: 100vw; min-height: 100vh; padding: 3rem 1rem; background-color: #0f172a; color: white; font-family: Arial, Helvetica, sans-serif;">

    <div style=" width: 100%; max-width: 350px; margin: 0 auto; height: 180px; margin-bottom: 2rem;">
      <img width="180" height="180" src="https://res.cloudinary.com/dt2o36ezn/image/upload/v1708967511/hotel-landing/DriveRock/logo-email-PNG_xnvpq4.png" alt="logo-drive-rock">
    </div>
    <h2 style="width: 100%; max-width: 350px; font-size: 1rem; margin: 0 auto; margin-bottom: 1rem;">👋 ¡Hola ${ name }!</h2>
    <h2 style="width: 100%; max-width: 350px; font-size: 1rem; margin: 0 auto;">🚗 Bienvenido/a a Drive Rock 🤘</h2>

    <p style="width: 100%; max-width: 350px; margin: 0 auto; margin-top: 2rem;">Para confirmar tu cuenta debes darle click al siguiente botón</p>

    <div style="width: 100%; max-width: 350px; margin: 0 auto; margin-top: 2rem;">
      <a style="text-decoration: none; background-color: #2f54cf; color: white; padding: 0.7rem 1.5rem; border-radius: 25px; box-shadow: 0 2px 10px rgba(0, 0, 0, .5);" href="http://localhost:3001/auth/confirm-account/${ token }">Confirmar cuenta</a>
    </div>

    <div style="margin-top: 2rem; width: 100%; max-width: 350px; margin: 0 auto; margin-top: 2rem;">
      <p>Si no puedes hacer click, copia y pega la siguiente URL en tu navegador web:</p>
      <p style="color: #2f54cf; word-wrap: break-word; max-width: 350px; width: 350px; text-align: left; margin: 0 auto;">http://localhost:3001/auth/confirm-account/${ token }</p>
      <br> <br>
      <p>Este enlace caducará en 24 horas.</p>
      <p>Atentamente,</p>
      <p>El equipo de Drive Rock </p>
    </div>
  </div>
  
</body>
</html>
  `;

}


export const getTemplateResetPassword = (name, token) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verify</title>
  </head>
    <body style="margin: 0; padding: 0; box-sizing: border-box;">
      <div style="max-width: 100vw; min-height: 100vh; padding: 3rem 1rem; background-color: #0f172a; color: white; font-family: Arial, Helvetica, sans-serif;">

      <div style=" width: 100%; max-width: 350px; margin: 0 auto; height: 180px; margin-bottom: 2rem;">
        <img width="180" height="180" src="https://res.cloudinary.com/dt2o36ezn/image/upload/v1708967511/hotel-landing/DriveRock/logo-email-PNG_xnvpq4.png" alt="logo-drive-rock">

        <h2 style="width: 100%; max-width: 350px; font-size: 1rem; margin: 0 auto; margin-bottom: 1rem;">👋 ¡Hola ${ name }!</h2>
        <h2 style="width: 100%; max-width: 350px; font-size: 1rem; margin: 0 auto;">🔒 Solicitaste cambiar tu contraseña</h2>
    
        <p style="width: 100%; max-width: 350px; margin: 0 auto; margin-top: 2rem;">Para recuperar tu contraseña dale click al siguiente botón</p>
    
        <div style="width: 100%; max-width: 350px; margin: 0 auto; margin-top: 2rem;">
          <a style="text-decoration: none; background-color: #2f54cf; color: white; padding: 0.7rem 1.5rem; border-radius: 25px; box-shadow: 0 2px 10px rgba(0, 0, 0, .5);" href="http://localhost:5173/auth/reset-password/${ token }">Nueva contraseña</a>
        </div>
        <div style="margin-top: 2rem; width: 100%; max-width: 350px; margin: 0 auto; margin-top: 2rem;">
          <p>Si no has solicitado restablecer tu contraseña, ignora este correo electrónico.</p>
          <p>Si no puedes hacer click, copia y pega la siguiente URL en tu navegador web:</p>
          <p style="color: #2f54cf; word-wrap: break-word; max-width: 350px; width: 350px; text-align: left; margin: 0 auto;">http://localhost:5173/auth/rest-password/${ token }</p>
          <br> <br>
          <p>Este enlace caducará en 24 horas.</p>
          <p>Atentamente,</p>
          <p>El equipo de Drive Rock </p>
        </div>
      </div>
    </body>
  </html>`  
}

