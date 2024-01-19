package com.ghouse.sana.service;

import com.ghouse.sana.dto.GptRQ;
import com.ghouse.sana.dto.MessageBlock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GptServiceImpl implements GptService{
    private static Logger log = LoggerFactory.getLogger(GptServiceImpl.class);

    @Autowired
    private com.ghouse.sana.proxy.GptProxy gptProxy;
    @Override
    public String sendReq(GptRQ gptRQ) {
        if(gptRQ.getModel() == null){
            gptRQ.setModel("gpt-3.5-turbo");
        }

        List<MessageBlock> messages = gptRQ.getMessages();
        log.info("messages: {}",messages);

        String response = gptProxy.sendRequest(gptRQ);

        return response;

    }
}
