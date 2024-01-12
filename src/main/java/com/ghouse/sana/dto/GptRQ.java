package com.ghouse.sana.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class GptRQ {

	private String model;

	private List<MessageBlock> messages;


}
