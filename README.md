# webkit-semiproject
## 가계부 웹 애플리케이션
![Image](https://github.com/user-attachments/assets/02951c41-5515-43a6-8209-8955fa9f9ac0)
​
![Image](https://github.com/user-attachments/assets/f1d438bd-a609-4cab-88c2-902eeffd1bba)

### 📚 프로젝트 개요

#### 🔬 개발 기술

개발 툴 : VSCode

협업 도구 : Slack, Github

프론트엔드: React

백엔드: Node.js

인증: JWT 토큰을 활용한 사용자 인증 경로

### ✨ 주요 기능

#### 👤 회원가입 및 로그인

JWT 토큰을 활용한 사용자 인증 공유 및 로그인 상황 유지

리프레시 토큰을 활용한 자동 로그인 연장

#### 💵 수입 및 지출 관리

내역 추가: 금액, 카테고리, 날짜, 메모 등의 정보를 입력하여 저장

내역 조회: 사용자의 수입/지출 내역 보기

내역 수정: 기존 입력된 내역 수정

내역 삭제: 저장된 내역 삭제

#### 🔄 배너스 기능

카테고리별 소비 분석: 특정 기간 동안의 소비 내역을 카테고리별로 분류하여 차트로 시각화

월별 지출 비교: 캬리넷에서 일자별 지출 확인

#### 🌟 추후 추가 예정 기본

검색 기능

회원 정보 수정

아이디/비밀번호 찾기

#### 📚 설치 및 사용법

final-version 브랜치를 다운로드 합니다.

frontend 폴더와 backend 폴더에서 아래 명령어를 실행합니다.
```
npm install --force
npm run-script dev // frontend
npx nodemon server.js // backend
```
프론트엔드는 http://localhost:5173 로 
백엔드는 http://localhost:7777 로
접속할 수 있습니다.

​

추후 추가 예정 기술: 검색기능, 회원정보 수정, 아이디, 비밀번호 찾기

​

### 조원

[김명진](https://github.com/kps9190), [황정민](https://github.com/HwangJeongM) - frontend

[이용문](https://github.com/Leeyongmun), [차유비](https://github.com/chyubi), [최연우](https://github.com/wafla) - backend
