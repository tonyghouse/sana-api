import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import homeController from './controller/HomeController.js';
import terminal1Controller from './controller/Terminal1Controller.js';
import terminal2Controller from './controller/Terminal2Controller.js';
dotenv.config();
const app = express();  
app.use(cors()); 
app.use(bodyParser.json());

const port = 3000;

app.use('/', homeController);
app.use('/terminal-1', terminal1Controller);
app.use('/terminal-2', terminal2Controller);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
