package com.kakao.work.yaml;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@EnableConfigurationProperties
@ConfigurationProperties(prefix="chatroom")
public @Data class ChatRoomConfigurationYaml {
  private List<Map<String, String>> list = new ArrayList<Map<String, String>>();
}