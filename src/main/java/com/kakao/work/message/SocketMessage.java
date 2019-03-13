package com.kakao.work.message;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
 * websocket 통신 메세지 형식
 */
@Data
public class SocketMessage {
  public SocketMessage() {}    

  public SocketMessage(String id) {
    this.id = id;
  }

  public SocketMessage(String id, String type, String message) {
    this.id = id;
    this.type = type;
    this.message = message;
  }

  @JsonProperty("id")
  private String id;  // 사용자 ID값
  @JsonProperty("type")
  private String type;  // message 형식 (image or text)
  @JsonProperty("message")
  private String message; // message 텍스트
}