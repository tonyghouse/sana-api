package com.ghouse.sana.service;

import com.ghouse.sana.dto.GptRQ;
import com.ghouse.sana.dto.GptRS;

import java.util.List;

public interface GptService {
    String sendReq(GptRQ gptRQ);
}
