# gulp-setting
Dstyle's Gulp Setting (Default)

# Basic Usage
nodejs가 기본으로 설치되어있어야 하며, 아래의 파일을 다운로드받아서 프로젝트 루트에 압축을 풀어주고 도스창(CMD)을 열어서 아래와 같이 실행해주세요.
필요파일 : "gulpfile.js" , "pakage.json" , ".csscomb.json"

# Install
```
npm install --save-dev
```

# Task List

```
$ gulp 테스크이름
```

#### Default
scss , less 을 컴파일하고, css 을 합친후에 각파일 감지를 시작합니다.

#### build
"src/" 폴더 내 "scss:build" , "less:build" , "css:concat" 실행

#### watch
"src/" 폴더 내 "scss:watch" , "less:watch" , "css:watch" 실행

#### scss
scss(SASS)을 빌드하고, 감지하여 Task을 연결합니다.

#### scss:build
"/src/scss/**/*.scss" 을 /src/css 로 빌드합니다.

#### scss:watch
"/src/scss/**/*.scss"의 변화를 감지하여 /src/css 로 개별빌드합니다.

#### less
LESS을 빌드하고, 감지하여 Task을 연결합니다.



# gulp-setting
Dstyle's Gulp Setting (Default)

# Install
```
npm install --save-dev
```

# Basic Usage
nodejs가 기본으로 설치되어있어야 하며, 본 파일을 다운로드받아서 프로젝트 루트에 압축을 풀어주고 도스창(CMD)을 열어서 아래와 같이 실행해주세요.

# Task List

#### Default
scss , less 을 컴파일하고, css 을 합친후에 각파일 감지를 시작합니다.

#### build
"src/" 폴더 내 "scss:build" , "less:build" , "css:concat" 실행

#### watch
"src/" 폴더 내 "scss:watch" , "less:watch" , "css:watch" 실행

#### scss
scss(SASS)을 빌드하고, 감지하여 Task을 연결합니다.

#### scss:build
"/src/scss/**/*.scss" 을 /src/css 로 빌드합니다.
