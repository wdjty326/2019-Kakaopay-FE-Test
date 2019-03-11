package com.kakao.work.message;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * websocket 통신 메세지 형식
 */
public @Data class SocketMessage {
  private String id;  // 사용자 ID값
  private String type;  // message 형식 (image or text)
  private String message; // message 텍스트
}