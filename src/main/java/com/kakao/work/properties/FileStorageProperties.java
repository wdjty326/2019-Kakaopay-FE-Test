package com.kakao.work.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@ConfigurationProperties(prefix = "file")
@EnableConfigurationProperties
public @Data class FileStorageProperties {
  private String uploadDir;
}