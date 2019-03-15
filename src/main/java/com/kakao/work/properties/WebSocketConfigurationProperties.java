package com.kakao.work.properties;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@ConfigurationProperties(prefix="websocket")
@EnableConfigurationProperties
public @Data class WebSocketConfigurationProperties {
  private Map<String, String> prefix = new HashMap<String, String>();
  private Map<String, String> endpoint = new HashMap<String, String>();
}