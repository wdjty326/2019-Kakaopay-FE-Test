package com.kakao.work.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@ConfigurationProperties(prefix = "file")
public @Data class FileStorageProperties {
  private String uploadDir;
}