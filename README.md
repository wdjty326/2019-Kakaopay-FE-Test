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


## Getting Start

### 개발 환경
- NPM
- openJDK 11
- Visual Studio Code
- Spring-Boot

#### 프론트 개발
- ReactJS
- Bootstrap 4
- React-Router-Dom
- Redux

#### 백엔드 개발
- java
- spring-boot
- websocket(+stomp)

### 프로젝트 환경 구성
``` bash
# opneJDK 11 및 Visual Studio Code 다운 및 설치
openJDK 11 Link : http://jdk.java.net/11/
Visual Studio Code Link : https://code.visualstudio.com/Download

# visual studio code 실행 후 플러그인 다운
1. Spring Boot Extension Pack
2. Lombok Annotations Support for VS Code
3. Java Extension Pack

# Preferences >> Setting 에서 설정검색에 jdk 검색 후, setting.json 파일에 java.home 추가
"java.home": "/Library/Java/JavaVirtualMachines/jdk-11.0.2.jdk/Contents/Home" # mac
```

### 프로젝트 빌드 & 테스트 & 실행
``` bash
# package.json 에 정의된 모듈 다운
$ npm i

# webpack 으로 js 파일 빌드
./node_modules/.bin/webpack -d
or
npm run build

# webpack 으로 ui 테스트 코드 실행
# ui 테스트 시 spring-boot 사전 실행 필요
npm run test:unit

# spring-boot 테스트 코드 실행
./mvnw test
or
npm run test:server

# spring-boot 실행
./mvnw spring-boot:run
or
npm run start
```


## 프로젝트 내용 정리

### 처리 프로세스 정리
- 입력받은 사용자ID 정보 클라이언트에서 저장
- API를 통해 가져오는 채팅방 리스트를 클라이언트에게 표출
- 선택한 채팅방 ID값을 클라이언트에게 저장
- 채팅방 ID와 사용자 ID로 웹소켓 연결
- 연결 성공시, 선택한 채팅방에 있는 사용자들에게 메세지 PUSH
- 메세지 전송 API로 채팅처리

### 작업 리스트 정리
- [x] README.md 초안 작성
- [x] 개발 환경 구축 (Spring-boot, React, Webpack4)
- [x] 프로젝트 구조 설계
- [x] 초기 API 리스트 정리
- [ ] 개발 및 테스트
  - [x] 기본 REST API 기능 개발
  - [x] 웹소켓 메세지 브로커(stomp) 적용
  - [x] 웹소켓 API 개발
  - [x] REST API 및 소켓 테스트 코드 작성 및 실행
  - [x] Redux 환경 구성
  - [x] 화면 설계 및 기본 기능 개발
  - [x] React 로 화면 개발
  - [x] React 화면 UI 작성
  - [x] mocha 로 화면 테스트 코드 샘플링 작성 및 실행
  - [ ] 화면 테스트 코드 작성 및 실행
- [x] 전체 기능 리스트 점검
- [x] README.md 추가 수정

### API 정의
| API | 정의 | 파라미터 | 응답타입 | 응답값 | 기타
|---|---|---|---|---|---|
| GET<br>/api/chatroom | 채팅 리스트를 가져옵니다. | N/A | JSON | [{'item.id': 'test', 'item.name': 'test}] | 
| POST<br>/api/uploadFile | 파일을 업로드 합니다. | file={file} | multipert/form-data | {'fileName': 'test',<br> 'fileDownloadUri': 'http://locahost:3000/image/test.jpg',<br>,'size': 123123<br>, 'fileType': 'image/png'} | 
| GET<br>/app/connect/{chatroomId} | 선택한 채팅방에 접속합니다. | id={String}<br>chatroomId={String} | JSON String | {'id': 'test',<br>'type': 'connect', <br>'message': null,<br>'fileSource': null} | WebSocket API
| GET<br>/app/push/{chatroomId} | 채팅을 전송합니다. | id={String}<br>chatroomId={String}<br>filesource={String URL}<br>message={String} | JSON String | {'id': 'test',<br>'type': 'push', <br>'message': 'test',<br>'fileSource': 'http://localhost:3000/image/test.jpg'} | WebSocket API

### 문제 해결 전략
  1. 채팅방 리스트 정보 처리
  - chatroomId 정보를 서버 application.yaml 에 저장
  - 채팅방 리스트를 가져오는 api를 호출
  - 사용자는 정해진 채팅방 리스트를 선택 시, 해당 채팅방의 id값을 local store에 저장
  - refresh 시 해당 정보 소멸

  2. 채팅 메세지 보관
  - state에 cache정보를 담는 배열 추가
  - cache 데이터로 보낸 사용자ID, 메세지, 이미지 링크, 보낸 메세지의 타입의 데이터 보관
  - 최초접속 메세지와 보낸 메세지는 cache에 저장된 메세지 타입으로 구별
  - 사용자 메세지는 cache에 있는 사용자ID로 구별
  - cache 데이터에 있는 정보를 화면에 출력

  3. 이미지 전송 처리
  - 메세지를 클라이언트에서 datasource로 변환 후, 메세지에 담아서 보냄
  - push 받은 채팅방 접속자들은 datasource 데이터 형식 그대로 사용
  * 이슈 발생!
    1. 이슈 내용
    - datasource크기가 서버에서 지정한 max치를 넘어가면 메세지가 전송되지 않는 이슈 발생
    2. 이슈 처리
    - datasource크기를 줄이기위한 jpeg 확정자 변경 처리 및 사이즈 축소 처리
    - 처리 이후에도 2mb이상의 메세지에서 해당 현상 발생
    3. 이슈 해결
    - 파일을 업로드 api를 별도로 생성
    - 업로드 url을 메세지에 전송하는 방식으로 변경하여 해결

  4. 새로고침 처리
  - react-router-dom 를 사용 중 이므로 로그인 외의 페이지에서 새로고침 시, 로그인 페이지가 아닌 별도의 페이지를 보여줌
  - chatroom 페이지에서 새로고침 발생 시, 채팅 문구에 서버와의 연결이 종료되었으니, 로그아웃을 시도해 달라는 문구를 출력처리

### 해결하지 못한 이슈 정리

#### UI 테스트
- Redux 비동기 액션에 대한 테스트 코드 작성 처리
- 컴포넌트 안에 있는 redux 액션에 대한 테스트 코드 작성 처리
- 컴포넌트 안에 있는 소켓 연결 처리에 대한 테스트 코드 작성 처리