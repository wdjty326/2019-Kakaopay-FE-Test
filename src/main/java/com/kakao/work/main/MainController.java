package com.kakao.work.main;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * 메인부분
 */
@Controller
public class MainController {
  
  /**
   * index.jsp 호출
   */
  @GetMapping("/index")
  public String getMethodName(Model model) {
      return "index";
  }
  
}