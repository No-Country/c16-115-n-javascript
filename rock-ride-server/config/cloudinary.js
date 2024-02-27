import cloudinary from 'cloudinary';
cloudinary.v2;
import dotenv from 'dotenv';
dotenv.config;

const{CLOUD_NAME,CLOUD_KEY,API_SECRET}= process.env;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key:CLOUD_KEY,
    api_secret:API_SECRET
});


export const uploadImage = async (filePath)=>{
    return await cloudinary.uploader.upload(filePath,{
        folder:'drive-rock'
    })
}


