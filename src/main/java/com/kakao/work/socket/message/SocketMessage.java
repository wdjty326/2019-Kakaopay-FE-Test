package com.kakao.work.socket.message;

/**
 * websocket 통신 메세지 형식
 */
public class SocketMessage {
  private String id;  // 사용자 ID값
  private String type;  // message 형식 (image or text)
  private String message; // message 텍스트

  public SocketMessage() {}
  public SocketMessage(String id, String type, String message) {
    this.id = id;
    this.type = type;
    this.message = message;
  }

  public void setId(String id) {
    this.id = id;
  }
  public String getId() { 
    return id;
  }
  public void setType(String type) {
    this.type = type;
  }
  public String getType() {
    return type;
  }
  public void setMessage(String message) {
    this.message = message;
  }
  public String getMessage() {
    return message;
  }
}