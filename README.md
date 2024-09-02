# 코드 스타일 가이드라인 (풀스택)

프론트엔드에서 적용하는 코드 스타일 가이드라인입니다.

## 언어/프레임워크

| 디자인 | 언어       | 프레임워크 | 라이브러리           |
| ------ | ---------- | ---------- | -------------------- |
| Figma  | Javascript | React.js   | Scss & Axios & Redux |

## 스타일, 사용 툴

### ESLint

1. 설치 & 세팅

   -  Code - Preference - Extentions 에서 EsLint 검색 후 Install를 눌러서 설치한다.

    <pre><code>
      //.eslintrc.js
      
      "eslintConfig": {
       "extends": "react-app"
       }
   </code></pre>

2. ESLint+ Airbnb Style Guid

   -  eslint-config-airbnb를 포함 필수 5개의 플러그인 설치 (npm +5를 사용한다고 가정)
    <pre><code>
    npx install-peerdeps --dev eslint-config-airbnb
   </code></pre>

3. ESLint 세부설정

   -  package.json / .eslintrc.js / .eslintrc.json 파일 세곳중 한 곳에서 config 설정을 한다.
   -  프로젝트 최상단 폴더에 파일을 생성해주고 다음과 같은 코드를 작성한다.
    <pre><code>
       {
         "extends": ["airbnb", "prettier", "plugin:node/recommended"],
         "plugins": ["prettier"],
         "rules": {
           "prettier/prettier": "error",
           "no-unused-vars": "warn",
           "no-console": "off",
           "func-names": "off",
           "no-process-exit": "off",
           "object-shorthand": "off",
           "class-methods-use-this": "off"
         }
       }
   </code></pre>

   ### Prettier

   1. 설치 & 세팅

   -  Code - Preference - Extentions 에서 Prettier 검색 후 Install를 눌러서 설치한다.
   -  VS code 설정에 들어가 'Default Formatter'를 검색하고, '없음'에서 'Prettier - Code formatter'로 변경한다.
   -  프로젝트의 root directory에 .prettier.json/ .prettier.js 파일 둘 중 하나를 생성하여 아래 코드를 작성한다.
    <pre><code>
     arrowParens: 'always'
     bracketSpacing: true
     jsxBracketSameLine: false
     jsxSingleQuote: false
     printWidth: 80
     proseWrap: 'always'
     quoteProps: 'as-needed'
     semi: true
     singleQuote: true
     tabWidth: 2
     trailingComma: 'es5'
     useTabs: false
   </code></pre>
   -  Airbnb 코딩 규칙을 적용할 코드를 열고 F1를 누른 뒤, 'Format Document'를 입력하고 실행한다.
   -  더 간편하게 사용하기 위해, Ctrl + ,를 눌러 설정에 들어가서 'Format on Save' 를 검색하고 설정을 한다.

      -> 저장할 때 자동으로 Airbnb 코딩 규칙으로 변환되어 저장된다.

## 로컬 개발 환경 설정 가이드

이 문서는 Mac에서 React를 사용하여 로컬 개발 환경을 설정하는 방법을 안내합니다.

## 📋 목표 및 개요

이 가이드는 다음을 설정하는 방법을 설명합니다:

-  Node.js 및 npm
-  React 애플리케이션

## 🛠️ 사전 요구 사항

-  **하드웨어**: Macbook pro 14 inch m2 pro
-  **소프트웨어**: 최신 macOS: sonoma 14.5
-  **기타**: 시스템 관리자 권한
-  ** 크롭 권장 **

## 🚀 초기 설정

### 1. Homebrew 설치

Homebrew는 macOS의 패키지 관리자입니다. 터미널에서 다음 명령어를 실행하여 설치합니다:

Node.js 및 npm 설치

```bash
brew install node

// 설치 확인
node -v
npm -v

npm install -g yarn
yarn --version

```

**프로젝트 클론:**

```bash
git clone https://github.com/ktb-23/healthkungya-frontend.git

cd healthkungya-frontend

의존성 설치: yarn install

프론트 엔드 개발 실행: yarn run dev
```

### 프레젠테이셔널 & 컨테이너 컴포넌트

-  **components**
   -  UI를 구성하는 프레젠테이셔널 컴포넌트들
-  **containers**
   -  데이터와 상태를 관리하는 컨테이너 컴포넌트
-  **reducers**
   -  애플리케이션의 상태를 관리하는 리듀서들
-  **api**
   -  **설명**: 외부 API와의 통신을 처리하는 함수들
-  **hooks**
   -  재사용 가능한 커스텀 훅들
-  **providers**
   -  리덕스 스토어와 관련된 설정 및 프로바이더

### 참고링크

(https://kyuhyuk.kr/article/javascript/2021/05/13/ESLint-Prettier-Airbnb-Javascript-Style-Setting)
