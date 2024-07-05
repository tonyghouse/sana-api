export default class GptService {
    constructor(gptProxy) {
      this.gptProxy = gptProxy;
    }
  
    async sendReq(gptRQ) {
      if (!gptRQ.model) {
        gptRQ.model = 'gpt-3.5-turbo';
      }
  
      const messages = gptRQ.messages;
      console.log(`messages: ${JSON.stringify(messages)}`);
  
      const response = await this.gptProxy.sendRequest(gptRQ);
      return response;
    }
  }
  