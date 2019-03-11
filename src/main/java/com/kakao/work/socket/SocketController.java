package com.kakao.work.socket;

import java.util.ArrayList;
import java.util.List;

import com.kakao.work.socket.message.SocketMessage;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 메세지 제어 소스
 */
@Controller
public class SocketController {

  @GetMapping("/api/chatroom")
  public @ResponseBody List<String> chatroom() {
    List<String> list = new ArrayList<String>();

    list.add("test1");
    list.add("test2");
    list.add("test3");
    
    return list;
  }

  /**
   * 최초접속 메세지
   */
  @MessageMapping("/connect")
  @SendTo("/topic/connect")
  public SocketMessage connect(SocketMessage message) throws Exception {
    Thread.sleep(1000); // 딜레이 부여
    return message;
  }

  /**
   * 메세지 전송
   */
  @MessageMapping("/push")
  @SendTo("/topic/pull")
  public SocketMessage push(SocketMessage message) throws Exception {
    return message;
  }
}