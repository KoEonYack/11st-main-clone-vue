<div align=center>

# 11번가 메인페이지 클론 (with Vue)

Vue로 만들어보는 11번가 메인 페이지

</div>

## 🌿 Branch 

- `main`: 배포 코드를 관리하는 브랜치입니다.
- `dev`: 테스트 및 개별 기능 구현이 완료된 코드를 관리하는 브랜치입니다.
- `feature/xxx`: xxx기능을 위한 코드를 관리하는 브랜치입니다.
   - `feature/init`: 초기 프로젝트 설정 및 eslint를 설정하였습니다.
   - `feature/search`: 상단 검색 버튼을 개발하였습니다. 
   - `feature/LNB`: 좌측 네비게이션을 개발하였습니다.

## 🌐 API

Method | URL | Response
--|--|--
GET | https://trusting-williams-8cacfb.netlify.app/.netlify/functions/main | JSON
GET | https://trusting-williams-8cacfb.netlify.app/.netlify/functions/search | String

> 예제 진행을 위해 검색 요청은 약 2초 뒤에 응답됩니다! 

### Parameters

Parameter | Type | URL | Required | Description
--|--|--|--|--
apiKey | String | - | Y | 인증 키
requestName | String | main | Y | 요청할 데이터 이름
searchText | String | search | Y | 검색어

### Request names

Name | Description
--|--
navDrawers | 네비게이션 메뉴 목록 
rankings | 실시간 쇼핑 검색어 목록 (1~20위)
billboards | 빌보드 슬라이드(Swiper) 제품 목록 (12개)
directs | 바로가기 메뉴 목록 (쇼킹딜~사업자전용몰) 
banner | 전역 우하단 고정 배너 내용
hotFocus | 시선집중 할인 제품 목록 (6개)

## 🚩 Features

- [x] Parcel 번들러를 통해 Vue.js 프로젝트를 구성할 수 있습니다.
- [x] CSS 공급 업체 접두사를 자동으로 생성할 수 있습니다.(Autoprefixer)
- [x] Vue SFC(싱글 파일 컴포넌트) 스타일을 정의해, 협업을 위한 코드 품질을 향상시킬 수 있습니다.(ESLint)
- [x] Vue.js 플러그인을 생성하고 적용할 수 있습니다.
- [x] 11번가 커스텀 API를 요청하고, 실제 쇼핑 데이터를 응답받아 처리할 수 있습니다.(Axios.js)
- [x] Global Navigation을 구성하고 디테일한 동작을 제어할 수 있습니다.
- [ ] 다양한 종류의 슬라이드 효과를 개발할 수 있습니다.(Swiper.js)
- [ ] 간단한 수준의 날짜 정보를 처리할 수 있습니다.(Day.js)
- [ ] Image Sprite 방식을 이용하여 이미지 요청 횟수를 줄일 수 있습니다.
- [ ] 페이지의 각 섹션(Section)의 내용을 Lazy Loading할 수 있습니다.(Intersection Observer)
- [ ] 중앙 집중식 데이터를 처리하고 네임스페이스를 관리할 수 있습니다.(Vuex)
- [ ] SCSS(CSS Preprocessor)로 더 쉽고 빠르게 스타일을 작성하고 관리할 수 있습니다.

## 📚 Tech Stack

- Vue.js
- Vuex(Store)
- 11st API(Custom)
- Parcel Bundler(HMR)
- SCSS
- Babel
- ESLint
- PostCSS
- Autoprefixer
- Axios
- Dayjs
- Lodash
- Swiper

## 🔧 Getting Started 

### Prerequisites

| Require                              | Description                                                               |
| ------------------------------------ | ------------------------------------------------------------------------- |
| [Git](https://git-scm.com/)          | We follow the [GitHub Flow](https://guides.github.com/introduction/flow/) |
| [Node.js](nodejs.org)                | 10.10 LTS or above                                                        |
| [Npm](https://www.npmjs.com/)        | Recommend [stable version](https://github.com/npm/cli)                    |

### Npm CILs

__Install project__
```
$ npm install 
```

__Build project__
```
$ npm run build
```

__Start project__
```
$ npm run build
```

## Reference

- [Vue.js Official DOC. 플러그인 사용하기](https://kr.vuejs.org/v2/guide/plugins.html)

## License

[MIT](./LICENSE)