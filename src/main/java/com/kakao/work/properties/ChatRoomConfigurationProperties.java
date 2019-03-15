package com.kakao.work.properties;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import lombok.Data;

@ConfigurationProperties(prefix="chatroom")
public @Data class ChatRoomConfigurationProperties {
  private List<Map<String, String>> list = new ArrayList<Map<String, String>>();
}