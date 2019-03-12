package com.kakao.work.configuration;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;

import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;


public class WebSocketHandshakeInterceptor extends HttpSessionHandshakeInterceptor {
  private final Logger logger = LoggerFactory.getLogger(getClass());

  @Override 
  public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception { 
    logger.info("beforeHandshake");
    return super.beforeHandshake(request, response, wsHandler, attributes); 
  } 
}
