import express from 'express';
import { GptService } from '../services/GptService.js';
import { GptProxy } from '../proxy/GptProxy.js';

const router = express.Router();
const gptProxy = new GptProxy();
const gptService = new GptService(gptProxy);

router.post('/', async (req, res) => {
    console.log(`Terminal-2 send Req GptRQ: ${JSON.stringify(req.body)}`);
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
