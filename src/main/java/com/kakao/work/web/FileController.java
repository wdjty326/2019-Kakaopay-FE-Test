package com.kakao.work.web;

import com.kakao.work.message.FileUploadMessage;
import com.kakao.work.service.FileStorageService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@Controller
public class FileController {
  private final Logger logger  = LoggerFactory.getLogger(getClass());
  @Autowired
  private FileStorageService fileStorageService;
  
  /**
   * 파일업로드
   */
  @PostMapping(value="/api/uploadFile")
  @ResponseBody
  public FileUploadMessage uploadFile(@RequestParam("file") MultipartFile file) {
    String fileName = fileStorageService.storeFile(file);
    String fileDownloadUri = null;
    if (fileName != null) {
      fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/image/")
            .path(fileName)
            .toUriString();
    }

    return new FileUploadMessage(fileName, fileDownloadUri,
            file.getContentType(), file.getSize());
  }
}