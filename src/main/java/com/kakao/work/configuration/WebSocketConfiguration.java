package com.kakao.work.configuration;

import java.util.Map;

import com.kakao.work.yaml.WebSocketConfigurationYaml;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

/**
 * 웹소켓 설정 소스
 * 메세지 브로커를 사용한 1:N 메세지 교환 처리
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

  @Autowired
  private WebSocketConfigurationYaml yaml;
  /**
   * 브로커 접근 URL 설정
   */
  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    Map<String, String> prefix = yaml.getPrefix();
    config.enableSimpleBroker(prefix.get("broker"));
    config.setApplicationDestinationPrefixes(prefix.get("destination"));
  }

  /**
   * 웹소켓 endpoint 설정
   * 웹소켓이 호환되지 않는 브라우저를 위한 SockJS 사용 설정
   */
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    Map<String, String> endpoint = yaml.getEndpoint();
    registry.addEndpoint(endpoint.get("sockjs"))
      .withSockJS();
  }

  /**
   * 전송사이즈 버퍼 및 통신 대기시간 설정
   */
  @Override
  public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
    registration.setMessageSizeLimit(102400 * 1024);
    // registration.setSendBufferSizeLimit(1024 * 1024);
    // registration.setSendTimeLimit(20000);
  }

}