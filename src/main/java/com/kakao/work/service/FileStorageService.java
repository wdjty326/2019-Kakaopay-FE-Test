package com.kakao.work.service;

import java.net.URLEncoder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.io.IOException;
import java.nio.file.StandardCopyOption;

import com.kakao.work.properties.FileStorageProperties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * 파일 서비스 로직
 */
@Service
public class FileStorageService {
  private final Logger logger  = LoggerFactory.getLogger(getClass());
  private final Path fileStorageLocation;

  @Autowired
  public FileStorageService(FileStorageProperties fileStorageProperties) {
    this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
            .toAbsolutePath().normalize();

    try {
      Files.createDirectories(this.fileStorageLocation);
    } catch (Exception ex) {
      logger.error("파일을 저장할 스토어가 생성되지 않았습니다.", ex);
    }
  }

  public String storeFile(MultipartFile file) {
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());

    try {
      // if(fileName.contains("..")) {
      //   logger.error("파일명이 없습니다. " + fileName);
      //   return null;
      // }
      
      fileName = URLEncoder.encode(fileName, "UTF-8");
      fileName = new SimpleDateFormat("yyMMddHHmmssZ").format(new Date()) + fileName;

      Path targetLocation = this.fileStorageLocation.resolve(fileName);
      Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

      return fileName;
    } catch (IOException ioException) {
      logger.error("스토어에 " + fileName + "을 저장하지 못했습니다. 다시 시도해주세요!", ioException);
    } catch (Exception exception) {
      logger.error(fileName + "를 UTF-8로 인코딩하는데 실패하였습니다.", exception);
    }

    return null;
  }
}