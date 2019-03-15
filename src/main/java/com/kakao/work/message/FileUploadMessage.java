package com.kakao.work.message;

import lombok.Data;

@Data
public class FileUploadMessage {
  private String fileName;
  private String fileDownloadUri;
  private String fileType;
  private long size;

  public FileUploadMessage() {}
  public FileUploadMessage(String fileName, String fileDownloadUri, String fileType, long size) {
    this.fileName = fileName;
    this.fileDownloadUri = fileDownloadUri;
    this.fileType = fileType;
    this.size = size;
  }
  
}