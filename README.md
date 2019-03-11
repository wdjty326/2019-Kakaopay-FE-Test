# 프론트 엔드 개발자 사전 과제

### 과제
- 채팅 어플리케이션 만들기

### 기능
- 사용자는 첫 진입 시, ID를 입력하여 접속할 수 있다.
- 채팅방 리스트에서 채팅방을 선택하여 들어갈 수 있다.
- 채팅방에 다른 사용자를 초대할 수 있다.
- 사용자는 채팅방에서 텍스트를 입력할 수 있다.
- 사용자는 채팅방에서 이미지를 입력할 수 있다.

### 과제 요구사항
- Client side rendering으로 개발
- 언어에 대한 제한은 없음
- 서버 구현 방법에 대한 제한 없음 (REST API, Long Polling, Socket...)
- 프론트엔드 구현 방법은 제한 없음 (Angular, React, Preact, Vue, jQuery...)
- UI 구현에 대한 제약은 없음
- 단위 테스트 필수, UI 테스트(Storybook, Selenium)와 통합 테스트는 선택
- README.md 파일에 문제해결 전략 및 프로젝트 빌드, 실행 방법 명시

### 예시 및 설명
- 위 언급되지 않은 내용에 대해서는 자유롭게 작성할 수 있다.

![kakaotalk](./chat1.png)
![kakaotalk](./chat2.png)
![kakaotalk](./chat3.png)

## Getting Start

### 개발 환경
- NPM
- openJDK 11
- Spring-Boot
- Websocket

#### 개발서버 실행
``` bash

# package.json 에 정의된 모듈 다운
$ npm i

# webpack 으로 js 파일 빌드
./node_modules/.bin/webpack -d

# spring-boot 실행
./mvnw spring-boot:run
```

### API 정의
| API | 정의 | 파라미터 |
|---|---|---|
| GET<br>/api/chatroom/list | 채팅 리스트를 가져옵니다. | N/A |
| GET<br>/api/connect/{id}/{chatroomId} | 선택한 채팅방에 접속합니다. | id={Long}<br>chatroomId={Long} |
| GET<br>/api/push | 채팅을 전송합니다. | id={Long}<br>chatroomId={Long}<br>text={String}<br>type={String 'image' or 'text'} |



### 처리 프로세스
- 입력받은 사용자ID 정보 클라이언트에서 저장
- API를 통해 가져오는 채팅방 리스트를 클라이언트에게 표출
- 선택한 채팅방 ID값을 클라이언트에게 저장
- 채팅방 ID와 사용자 ID로 웹소켓 연결
- 연결 성공시, 선택한 채팅방에 있는 사용자들에게 메세지 PUSH
- 메세지 전송 API로 채팅처리