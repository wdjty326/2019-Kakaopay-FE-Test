package com.kakao.work.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.support.SimpAnnotationMethodMessageHandler;
import org.springframework.messaging.simp.config.AbstractMessageBrokerConfiguration;

@Configuration
public class GlobalConfiguration { // extends AbstractMessageBrokerConfiguration {
  // @Bean
	// public SimpMessagingTemplate messageTemplate(){
	// 	SimpMessagingTemplate template = new SimpMessagingTemplate(brokerChannel());
  //   String prefix = getBrokerRegistry().getUserDestinationPrefix();
  //   if (prefix != null) {
  //       template.setUserDestinationPrefix(prefix);
	// 	}
	// 	return template;
	// }

	// @Bean
	// public SimpAnnotationMethodMessageHandler simpAnnotationMethodMessageHandler() {
	// 	SimpAnnotationMethodMessageHandler handler = createAnnotationMethodMessageHandler();
	// 	handler.setDestinationPrefixes(getBrokerRegistry().getApplicationDestinationPrefixes());
	// 	return handler;
	// }
}