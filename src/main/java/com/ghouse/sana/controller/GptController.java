package com.ghouse.sana.controller;

import com.ghouse.sana.dto.GptRQ;
import com.ghouse.sana.dto.GptRS;
import com.ghouse.sana.service.GptService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GptController {

    private static Logger log = LoggerFactory.getLogger(GptController.class);

    @Autowired
    private GptService gptService;

    @PostMapping(value = "/terminal-1", produces = "application/json")
    public ResponseEntity<String> sendRequest(@RequestBody GptRQ gptRQ) {
        log.info("Terminal-1 send Req GptRQ:{} ",gptRQ);
        String res = gptService.sendReq(gptRQ);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
