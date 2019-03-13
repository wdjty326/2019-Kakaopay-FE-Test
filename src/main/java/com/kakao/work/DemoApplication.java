package com.kakao.work;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		System.setProperty ( "spring.devtools.restart.enabled" , "false" );
		SpringApplication.run(DemoApplication.class, args);
	}

}
