export class GptService {
    private gptProxy: any;

    constructor(gptProxy: any) {
      this.gptProxy = gptProxy;
    }
  
    async sendReq(gptRQ: any) {
      if (!gptRQ.model) {
        gptRQ.model = 'gpt-3.5-turbo';
      }
  
      const messages = gptRQ.messages;
      console.log(`messages: ${JSON.stringify(messages)}`);
  
      const response = await this.gptProxy.sendRequest(gptRQ);
      return response;
    }
  }
