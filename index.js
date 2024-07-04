import express from 'express';
import bodyParser from 'body-parser';
import base64 from 'base-64';
import utf8 from 'utf8';
import cors from 'cors';


const app = express();
app.use(cors()); 
const port = 3000;

require('dotenv').config();
const allowedCredentials = process.env.ALLOWED_USERNAME_PASSWORD;

if (!allowedCredentials) {
    throw new Error('ALLOWED_USERNAME_PASSWORD environment variable is not set.');
}

const GptService = require('./service/gptService');
const GptProxy = require('./proxy/gptProxy');

app.use(bodyParser.json());

const gptProxy = new GptProxy();
const gptService = new GptService(gptProxy);


app.get('/', (req, res) => {
    res.send('<h1>Welcome to the SANA API</h1><p>A Misc API application</p>');
});

app.post('/terminal-1', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json("Auth Missing");
    }

    const userNameAndPassword = getUserNameAndPassword(authHeader);

    if (userNameAndPassword !== allowedCredentials) {
        return res.status(401).json("Wrong Credentials");
    }

    console.log(`Terminal-1 send Req GptRQ: ${JSON.stringify(req.body)}`);
    try {
      const gptRQ = req.body;
      const response = await gptService.sendReq(gptRQ);
      return res.status(200).json(response);
    } catch (error) {
      console.error('Error handling request:', error);
      return res.status(500).json({ error: 'An error occurred' });
    }
});

function getUserNameAndPassword(authHeader) {
    const token = authHeader.substring('Bearer '.length);
    const bytes = base64.decode(token);
    return utf8.decode(bytes);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
