import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
export default class GptProxy {
    constructor() {
        this.apiKey = process.env.OPENAI_API_SECRET;
        if (!this.apiKey) {
            throw new Error('OPENAI_API_KEY environment variable is not set.');
        }
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
            if (error.response) {
                console.error("API Error Response:");
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
            } else if (error.request) {
                console.error("No API Response:", error.request);
            } else {
                console.error("Error:", error.message);
            }
            throw error;
        }
        
    }
}
