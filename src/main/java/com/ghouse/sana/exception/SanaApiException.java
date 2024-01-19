package com.ghouse.sana.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class SanaApiException {
    private String errorMessage;
    private String errorCode;
}
