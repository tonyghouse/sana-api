import express from 'express';
import base64 from 'base-64';
import utf8 from 'utf8';
import { GptService } from '../service/GptService.js';
import { GptProxy } from '../proxy/GptProxy.js';

const router = express.Router();
const gptProxy = new GptProxy();
const gptService = new GptService(gptProxy);

const allowedCredentials = "testuser:testpwd";

if (!allowedCredentials) {
    throw new Error('ALLOWED_USERNAME_PASSWORD environment variable is not set.');
}

function getUserNameAndPassword(authHeader: string) {
    const token = authHeader.substring('Bearer '.length);
    const bytes = base64.decode(token);
    return utf8.decode(bytes);
}

router.post('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json("Auth Missing");
    }

    const userNameAndPassword = getUserNameAndPassword(authHeader);

    if (userNameAndPassword !== allowedCredentials) {
        return res.status(401).json("Wrong Credentials");
    }
    
    try {
        const gptRQ = req.body;
        const response = await gptService.sendReq(gptRQ);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});

export default router;
