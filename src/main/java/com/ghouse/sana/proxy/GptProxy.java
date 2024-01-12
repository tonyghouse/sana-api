package com.ghouse.sana.proxy;

import com.ghouse.sana.dto.GptRQ;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class GptProxy {
    private final RestTemplate restTemplate = new RestTemplate();
    private static Logger log = LoggerFactory.getLogger(GptProxy.class);

    @Value("${openai.api.key}")
    private String apiKey;

    public String sendRequest(GptRQ gptRQ) {

        String endpoint = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        try {
            HttpEntity<GptRQ> requestEntity = new HttpEntity<>(gptRQ, headers);
            ResponseEntity<String> responseEntity = restTemplate.exchange(endpoint, HttpMethod.POST, requestEntity, String.class);

            System.out.println("API Response Code: " + responseEntity.getStatusCode());
            System.out.println("API Response Body: " + responseEntity.getBody());
            return responseEntity.getBody();

        } catch (Exception exp) {
            log.error("Exception when calling api: {} ", exp);
            return exp.getMessage();
        }
    }
}



//            String prompt = "Translate the following English text to French: 'Hello, how are you?'";
//            Map<String, Object> requestBody = new HashMap<>();
//            requestBody.put("model", "gpt-3.5-turbo");
//            requestBody.put(
//                    "messages", List.of(
//                            Map.of("role", "system", "content", "You are a helpful assistant."),
//                            Map.of("role", "user", "content", prompt)