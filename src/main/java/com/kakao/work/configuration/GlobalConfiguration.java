package com.kakao.work.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.support.SimpAnnotationMethodMessageHandler;

// @Configuration
public class GlobalConfiguration {
  /*
  @Bean
  public SimpMessagingTemplate brokerMessagingTemplate() {
    SimpMessagingTemplate template = new SimpMessagingTemplate(brokerChannel());
    String prefix = getBrokerRegistry().getUserDestinationPrefix();
    if (prefix != null) {
      template.setUserDestinationPrefix(prefix);
    }
  }

  @Bean
  public SimpAnnotationMethodMessageHandler simpAnnotationMethodMessageHandler() {
    SimpAnnotationMethodMessageHandler handler = createAnnotationMethodMessageHandler();
    handler.setDestinationPrefixes(getBrokerRegistry().getApplicationDestinationPrefixes());
  }
  */
}