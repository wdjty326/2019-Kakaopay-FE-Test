package com.kakao.work.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.kakao.work.message.SocketMessage;
import com.kakao.work.yaml.ChatRoomConfigurationYami;
import com.kakao.work.yaml.WebSocketConfigurationYaml;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 메세지 제어 소스
 */
@Controller
public class SocketController {

  @Autowired
  private SimpMessagingTemplate Template;

  @Autowired
  private ChatRoomConfigurationYami chatroomConfiguration;

  @Autowired
  private WebSocketConfigurationYaml websocketConfiguration;
  /**
   * index.jsp 호출
   */
  @GetMapping("/index")
  public String getMethodName(Model model) {
      return "index";
  }
  
  @GetMapping("/api/chatroom")
  public @ResponseBody List<Object> chatroom() {
    return chatroomConfiguration.getInfo();
  }

  /**
   * 최초 사용자 접속 메세지 전달
   */
  @MessageMapping("/connect/{chatroomId}")
  // @SendTo("/topic/connect")
  public void connect(@DestinationVariable String chatroomId, @Payload SocketMessage message) throws Exception {
    Thread.sleep(1000); // 딜레이 부여
    String destination = getDestination(chatroomId);
    Template.convertAndSend(destination, message);
  }

  /**
   * 메세지 전송
   */
  @MessageMapping("/push/{chatroomId}")
  public void push(@DestinationVariable String chatroomId, @Payload SocketMessage message) throws Exception {
    Thread.sleep(1000); // 딜레이 부여
    String destination = getDestination(chatroomId);
    Template.convertAndSend(destination, message);
  }

  /**
   * charid :: {text}
   */
  private String getDestination(String chatroomId) {
    Map<String, String> prefix = websocketConfiguration.getPrefix();
    // /topic/chat/{chatroomId}
    return prefix.get("broker").concat("/chat/").concat(chatroomId);
  }
}