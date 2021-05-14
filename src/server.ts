import express from 'express';

const app = express();

app.get('/', (request, response) => {
	response.json({ message: 'Server Ok ' });
});

app.listen('3333', () => {
	console.log('🎈Server Started in http://localhost:3333');
});
