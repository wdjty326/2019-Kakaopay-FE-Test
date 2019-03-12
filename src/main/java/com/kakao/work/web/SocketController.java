package com.kakao.work.web;

import java.util.List;
import java.util.Map;

import com.kakao.work.message.SocketMessage;
import com.kakao.work.yaml.ChatRoomConfigurationYaml;
import com.kakao.work.yaml.WebSocketConfigurationYaml;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * 메세지 제어 소스
 */
@Controller
public class SocketController {
  // 로거
  private Logger logger = LoggerFactory.getLogger(getClass());

  @Autowired
  private SimpMessagingTemplate Template;

  @Autowired
  private ChatRoomConfigurationYaml chatroomConfiguration;

  @Autowired
  private WebSocketConfigurationYaml websocketConfiguration;
  /**
   * index.jsp 호출
   */
  @GetMapping("/index")
  public String index(Model model) {
    return "index";
  }
  
  @GetMapping("/api/chatroom")
  public @ResponseBody List<Map<String, String>> chatroom() {
    List<Map<String, String>> list = chatroomConfiguration.getList();
    this.logger.info("@/api/chatroom@response@" + list);
    return list;
  }

  /**
   * 최초 사용자 접속 메세지 전달
   */
  @MessageMapping("/connect/{chatroomId}")
  // @SendTo("/topic/connect")
  public void connect(@DestinationVariable String chatroomId, @Payload SocketMessage message) throws Exception {
    // Thread.sleep(1000); // 딜레이 부여
    String brokerString = getBrokerString("connect", chatroomId);
    Template.convertAndSend(brokerString, message);
    logger.info("@connect@brokerString@" + brokerString + "@message@" + message);
  }

  /**
   * 메세지 전송
   */
  @MessageMapping("/push/{chatroomId}")
  public void push(@DestinationVariable String chatroomId, @Payload SocketMessage message) throws Exception {
    // Thread.sleep(1000); // 딜레이 부여
    String brokerString = getBrokerString("push", chatroomId);
    Template.convertAndSend(brokerString, message);
    logger.info("@push@brokerString@" + brokerString + "@message@" + message);
  }

  /**
   * charid :: {text}
   */
  private String getBrokerString(String type, String chatroomId) {
    Map<String, String> prefix = websocketConfiguration.getPrefix();
    type = "/" + type + "/";
    // /topic/chat/{chatroomId}
    return prefix.get("broker").concat(type).concat(chatroomId);
  }

}