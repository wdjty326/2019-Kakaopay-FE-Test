package com.kakao.work.message;

import lombok.Data;

/**
 * websocket 통신 메세지 형식
 */
public @Data class SocketMessage {
  public SocketMessage(String id) {
    this.id = id;
  }

  public SocketMessage(String id, String type, String message) {
    this.id = id;
    this.type = type;
    this.message = message;
  }

  private String id;  // 사용자 ID값
  private String type;  // message 형식 (image or text)
  private String message; // message 텍스트
}