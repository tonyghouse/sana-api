package com.ghouse.sana.controller;

import com.ghouse.sana.dto.GptRQ;
import com.ghouse.sana.dto.GptRS;
import com.ghouse.sana.service.GptService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
public class GptController {

    private static Logger log = LoggerFactory.getLogger(GptController.class);

    @Value("${allowed.username.password}")
    private String allowedUserNameAndPassword;

    @Autowired
    private GptService gptService;

    public GptController() {
    }

    @PostMapping(value = "/terminal-1", produces = "application/json")
    public ResponseEntity<String> sendRequest(@RequestHeader(value = "Authorization") String authHeader,
                                              @RequestBody GptRQ gptRQ) {

        String userNameAndPassword = getUserNameAndPassword(authHeader);

        if (!(userNameAndPassword.equals(allowedUserNameAndPassword))) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        log.info("Terminal-1 send Req GptRQ:{} ", gptRQ);
        String res = gptService.sendReq(gptRQ);
        return new ResponseEntity<>(res, HttpStatus.OK);


    }

    private static String getUserNameAndPassword(String authHeader) {
        String token = authHeader.substring("Bearer ".length());
        byte[] decodedBytes = Base64.getDecoder().decode(token);
        return new String(decodedBytes, StandardCharsets.UTF_8);
    }
}
