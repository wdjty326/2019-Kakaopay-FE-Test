package com.kakao.work.yaml;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@EnableConfigurationProperties
@ConfigurationProperties(prefix="websocket")
public @Data class WebSocketConfigurationYaml {
  private Map<String, String> prefix = new HashMap<String, String>();
  private Map<String, String> endpoint = new HashMap<String, String>();
}