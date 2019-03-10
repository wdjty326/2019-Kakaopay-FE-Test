package com.kakao.work.test;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

  @GetMapping("/")
  public String page(Model model) {
    return "index";
  }
}