package com.kakao.work.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.ExecutorSubscribableChannel;

@Configuration
public class GlobalConfiguration {
  // @Bean
	// public SimpMessagingTemplate messageTemplate(){
	// 	return new SimpMessagingTemplate(new ExecutorSubscribableChannel());
	// }
}