package com.kakao.work.properties;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@ConfigurationProperties(prefix="chatroom")
@EnableConfigurationProperties
public @Data class ChatRoomConfigurationProperties {
  private List<Map<String, String>> list = new ArrayList<Map<String, String>>();
}