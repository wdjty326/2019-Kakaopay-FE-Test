package com.kakao.work.configuration;

import javax.servlet.MultipartConfigElement;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
// import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;


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

	@Bean
	public MultipartConfigElement multipartConfigElement() {
		MultipartConfigFactory factory = new MultipartConfigFactory();
		factory.setMaxFileSize("512MB");
		factory.setMaxRequestSize("512MB");
		return factory.createMultipartConfig();
	}

	@Bean
	public MultipartResolver multipartResolver() {
		StandardServletMultipartResolver multipartResolver = new StandardServletMultipartResolver();
		// multipartResolver.setMaxUploadSize(512000000);
		return multipartResolver;
	}
}