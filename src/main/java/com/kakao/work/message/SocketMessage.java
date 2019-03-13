package com.kakao.work.message;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
 * websocket 통신 메세지 형식
 */
@Data
public class SocketMessage {
  private String id;  // 사용자 ID값
  private String type;  // message 형식 (image or text)
  private String message; // message 텍스트
  private String fileSource; // 이미지 파일

  public SocketMessage() {}    

  public SocketMessage(String id) {
    this.id = id;
  }

  public SocketMessage(String id, String type, String message) {
    this.id = id;
    this.type = type;
    this.message = message;
  }
}