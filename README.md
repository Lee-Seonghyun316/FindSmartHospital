## Description
호흡기 진료 지정 의료기관 정보 공공 데이터와 iot 레이더 센서 데이터를 이용해 병원의 혼잡도를 파악하고, 병원별 pcr 검사와 신속항원검사 여부에 대해 알려주는 반응형 웹입니다. 

- React
- CSS : styled-component, theme
- 로그인: firebase auth
- 페이지 이동 : react-router
- 로딩처리 : react-spinners

## Usage(자세한 실행 방법)

1. git clone
```
git clone https://github.com/Lee-Seonghyun316/FindSmartHospital.git
```
2. FindSmartHospital 폴더를 인터프린터나 컴파일러로 열기 
3. 필요한 라이브러리 설치 
```
npm install
```
4. 실행
```
npm run start
```

## 구현한 방법과 이유에 대한 간략한 내용

### App.js
- 페이지 이동 : 리액트 라우터 설정
- CSS : theme 설정

### theme.js
- 자주사용한 값 설정
- 반응형 : 미디어 쿼리 객체 추가

### App.css
- css reset

## /components

### Home.js

<img width="1440" alt="스크린샷 2022-02-11 오후 3 44 34" src="https://user-images.githubusercontent.com/70502670/153550849-c3f0c534-2ebb-46d5-a26c-5832547b17d3.png">

사용자에게 간단한 설명을 제공하고 로그인을 할 수 있는 메인페이지
- goHospitals : 병원 정보 확인페이지로 이동 및 userId 상태를 전달
- handleSignIn : firebase 이용 로그인 함수

### Hospitals.js

<img width="1440" alt="스크린샷 2022-02-11 오후 3 44 23" src="https://user-images.githubusercontent.com/70502670/153550861-2d746ae1-1230-4ee5-b155-af77e3268448.png">
<img width="1440" alt="스크린샷 2022-02-11 오후 3 44 26" src="https://user-images.githubusercontent.com/70502670/153550883-28b9cdc2-edd7-413d-9794-819ff98454df.png">

병원정보를 확인하고 예약을 진행할 수 있는페이지
- useState로 필요한 상태관리
- onAuthChange : 로그인여부 확인
- fetch 이용하여 외부 공공 데이터 받기
- parseStr : XML 형식 json으로 변환하고, 데이터 가공
- makeTable : 데이터셋 만들어지면, 사용자에게 보여줄 병원정보 table 생성
( iot 센서로 카운트한 대기실 인원 정보 필요)
- 데이터 없을 때, 로딩처리

## /radar
iot 센서에서 받아온 데이터 

## /Service

### firebase.js
firebase auth 세팅 및 로그인 로그아웃 onChange 함수 생성
