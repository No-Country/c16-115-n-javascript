
import dotenv from 'dotenv'

dotenv.config()
import jwt from 'jsonwebtoken'

const { SECRET_KEY } = process.env

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Token no proporcionado' })
  
  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, SECRET_KEY)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ error: 'token no es válido' })
  }
}

