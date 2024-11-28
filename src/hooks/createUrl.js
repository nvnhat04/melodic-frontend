// import dotenv from 'dotenv';
// dotenv.config();
import apiKey from './api.key.js';
const createUrl = (fileId) =>{
    // const apiKey = import.meta.env.GOOGLE_API_KEY;
    return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
}
export default createUrl;