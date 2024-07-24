# 코드 스타일 가이드라인 (풀스택)

풀스택에서 적용하는 코드 스타일 가이드라인입니다.

## 언어/프레임워크

| 디자인 | 언어       | 프레임워크            | 라이브러리                        | SQL   |
| ------ | ---------- | --------------------- | --------------------------------- | ----- |
| Figma  | Javascript | React.js & Express.js | Scss & Axios & Redux & Swagger.js | MySQL |

## 스타일, 사용 툴

### ESLint

1. 설치 & 세팅

   - Code - Preference - Extentions 에서 EsLint 검색 후 Install를 눌러서 설치한다.

    <pre><code>
      //.eslintrc.js
      
      "eslintConfig": {
       "extends": "react-app"
       }
   </code></pre>

2. ESLint+ Airbnb Style Guid

   - eslint-config-airbnb를 포함 필수 5개의 플러그인 설치 (npm +5를 사용한다고 가정)
    <pre><code>
    npx install-peerdeps --dev eslint-config-airbnb
   </code></pre>

3. ESLint 세부설정

   - package.json / .eslintrc.js / .eslintrc.json 파일 세곳중 한 곳에서 config 설정을 한다.
   - 프로젝트 최상단 폴더에 파일을 생성해주고 다음과 같은 코드를 작성한다.
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

   - Code - Preference - Extentions 에서 Prettier 검색 후 Install를 눌러서 설치한다.
   - VS code 설정에 들어가 'Default Formatter'를 검색하고, '없음'에서 'Prettier - Code formatter'로 변경한다.
   - 프로젝트의 root directory에 .prettier.json/ .prettier.js 파일 둘 중 하나를 생성하여 아래 코드를 작성한다.
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
   - Airbnb 코딩 규칙을 적용할 코드를 열고 F1를 누른 뒤, 'Format Document'를 입력하고 실행한다.
   - 더 간편하게 사용하기 위해, Ctrl + ,를 눌러 설정에 들어가서 'Format on Save' 를 검색하고 설정을 한다.

     -> 저장할 때 자동으로 Airbnb 코딩 규칙으로 변환되어 저장된다.

### 참고링크

(https://kyuhyuk.kr/article/javascript/2021/05/13/ESLint-Prettier-Airbnb-Javascript-Style-Setting)
