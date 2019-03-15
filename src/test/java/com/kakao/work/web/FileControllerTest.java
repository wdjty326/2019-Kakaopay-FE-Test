package com.kakao.work.web;

import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.fileUpload;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import javax.imageio.ImageIO;

import com.kakao.work.service.FileStorageService;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

/**
 * fileController에 명시된 api 테스트
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)  // 테스트 포트 충돌 방지
public class FileControllerTest {

  @Autowired
  private FileController controller;
 
  private MockMvc mockMvc;
  
  @Autowired
  private FileStorageService service;

  @Before
  public void setup() throws Exception {
    this.mockMvc = MockMvcBuilders.standaloneSetup(controller)
      .build();
  }

  @Test
  public void contexLoads() throws Exception {
    assertNotNull(controller);
    assertNotNull(service);
  }

  /**
   * 업로드 테스트
   */
  @Test
  public void upload() throws Exception {
    // File file = createImageFile();
    // InputStream is = new DataInputStream(new FileInputStream(file));
    MockMultipartFile multipartFile =
              new MockMultipartFile("file", "test.json", "application/json", "{}".getBytes());
    this.mockMvc.perform(fileUpload("/api/uploadFile").file(multipartFile))
              .andExpect(status().isOk())
              .andDo(print());
    // verify(this.service).save(any(FileUploadMessage.class));
  }

  @After
  public void destroy() throws Exception {
  }

  // private File createImageFile() throws Exception {
  //   int width = 250;
  //   int height = 250;

  //   // Constructs a BufferedImage of one of the predefined image types.
  //   BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

  //   // Create a graphics which can be used to draw into the buffered image
  //   Graphics2D g2d = bufferedImage.createGraphics();

  //   // fill all the image with white
  //   g2d.setColor(Color.white);
  //   g2d.fillRect(0, 0, width, height);

  //   // create a circle with black
  //   g2d.setColor(Color.black);
  //   g2d.fillOval(0, 0, width, height);

  //   // create a string with yellow
  //   g2d.setColor(Color.yellow);
  //   g2d.drawString("Java Code Geeks", 50, 120);

  //   // Disposes of this graphics context and releases any system resources that it is using. 
  //   g2d.dispose();

  //   // Save as PNG
  //   File file = new File("myimage.png");
  //   ImageIO.write(bufferedImage, "png", file);

  //   return file;
  // }
}