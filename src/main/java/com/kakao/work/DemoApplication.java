package com.kakao.work;


import com.kakao.work.properties.ChatRoomConfigurationProperties;
import com.kakao.work.properties.FileStorageProperties;
import com.kakao.work.properties.WebSocketConfigurationProperties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
	ChatRoomConfigurationProperties.class,
	WebSocketConfigurationProperties.class,
	FileStorageProperties.class
})
public class DemoApplication {
	public static void main(String[] args) {
		System.setProperty ( "spring.devtools.restart.enabled" , "false" );
		SpringApplication.run(DemoApplication.class, args);
	}

}
