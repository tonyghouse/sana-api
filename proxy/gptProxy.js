require('dotenv').config();
const axios = require('axios');

class GptProxy {
    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY;
    }

    async sendRequest(gptRQ) {
        const endpoint = "https://api.openai.com/v1/chat/completions";

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };

        try {
            const response = await axios.post(endpoint, gptRQ, { headers });
            
            console.log("API Response Code: " + response.status);
            console.log("API Response Body: " + response.data);
            return response.data;
        } catch (error) {
            console.error("Exception when calling API: ", error.message);
            throw error;
        }
    }
}

module.exports = GptProxy;
