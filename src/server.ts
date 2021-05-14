import express, { request } from 'express';

const app = express();

app.get('/',(request,response)=>{
    return response.json({message:'Server Ok '})
})

app.listen('3333',()=>{
    console.log('🎈Server Started in http://localhost:3333');
    
})