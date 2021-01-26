<template>
  <div>
    <nav 
      v-if="done"
      :class="{ show: isShowLNB }">
      <div class="user">
        <a href="javascript:void(0)">로그인</a>
        <div class="flex-space"></div>
        <div
          class="close-nav"
          @click="offNav"></div>
      </div>
      <!-- [container] 카테고리 ~ 브랜드몰까지 스크롤이 동작하는 영역 --> 
      <div
        class="container"
        @mouseleave="categoryHover = -1">
        <!-- [Group] 카테고리, 파트너스, 브랜드몰 각각의 단위들 --> 
        <div class="group categories">
          <h3 class="group__title">
            {{ navigations.categories.title }}
          </h3>
          <ul class="group__list">
            <li
              v-for="(item1, index) in navigations.categories.list"
              :key="item1.name"
              :class="{ hover: categoryHover === index }"
              @mouseenter="categoryHover = index">
              <div class="category-icon"></div>
              {{ item1.name }}
              <ul class="depth">
                <li
                  v-for="item2 in item1.list"
                  :key="item2.name">
                  <a :href="item2.href">
                    {{ item2.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="group major-services">
          <div>
            <div class="group__title">
              {{ navigations.majorServices.title }}
            </div>
          </div>
          <ul class="group__list">
            <li 
              v-for="item in navigations.majorServices.list"
              :key="item.name">
              <a :href="item.href">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Group --> 
        <div class="group outlets">
          <div class="group__title">
            {{ navigations.outlets.title }}  
          </div> 

          <ul class="group__list">
            <li
              v-for="item in navigations.outlets.list"
              :key="item.name">
              <a :href="item.href">
                <img
                  :src="item.src"
                  :alt="item.name"
                  width="250" />
              </a>
            </li>
          </ul>
        </div>
      </div>



      <!--Exhibitions Banner-->
      <div class="exhibitions">
        <a :href="navigations.exhibitions.href">
          <img
            :src="navigations.exhibitions.src"
            :alt="navigations.exhibitions.name" />
        </a>
      </div>
    </nav>

    <!-- BACKGROUND -->
    <div
      v-if="isShowLNB"
      class="nav-bg"
      @click="offNav"></div>
  </div>
</template>

<script>
export default {
  data () { // 반응성위해서 데이터 초기화
    return {
      navigation: {},
      done: false,
      categoryHover: -1,
      isShowOutlets: false,
      isShowPartners: false,
      isShowBrandMall: false,
    }
  },
  computed: {
    isShowLNB () {
      // this.$store.state.네임스페이스.상태
      return this.$store.state.navigation.isShowLNB
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.navigations = await this.$fetch({
        requestName: 'navigations'
      })
      this.done = true
    },
    offNav () {
      this.$store.dispatch('navigation/offNav')
    },
    toggleGroup() {

    }
  }
}
</script>

<style scoped lang="scss">
  nav {
    width: 300px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: #f6f6f6;
    transition: transform .4s;
    transform: translateX(-300px);
    &.show {
      transform: translateX(0);
    }
    .user {
      height: 70px;
      padding: 0 25px;
      background-color: #fff;
      display: flex; // x버튼과 수평을 만들기 위해서 
      align-items: center;
      a {
        font-size: 20px;
        font-weight: 700;
        text-decoration: none; // 텍스트 밑줄 사용하지 않는다. 
        &:hover {
          text-decoration: underline;
        }
      }
      .flex-space {
        flex-grow: 1; // 혼자 증가 넓이를 넣는 것 {로그인, X}를 양방향으로 밀어냄
      }
      .close-nav {
        width: 36px;
        height: 36px;
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
        background-position: -261px -203px;
        background-size: 363px;
        cursor: pointer;
      }
    }
    .container { // 
      // 광고 이전까지 영역 스크롤바
      height: calc(100% - 70px - 94px); // nav-tag height - {로그인영역 + 배너영역}
      overflow-y: auto;
      padding: 10px 0;
      box-sizing: border-box;

      // Common Group CSS
      .group {
        background-color: #fff;
        margin-bottom: 10px;
        &__title { // .group__title 
          padding: 14px 25px;
          font-size: 17px;
          font-weight: 700;
        }
        &__list { // .group__list
          li {
            display: flex;
            align-items: center;
          }
        }
      }
      // Each Group CSS
      .group {
        &.categories {
          .group__list {
            > li {
              height: 50px;
              padding: 0 25px;
              .category-icon {
                width: 24px;
                height: 24px;
                margin-right: 4px;
                background-image: url("https://trusting-williams-8cacfb.netlify.app/images/categories_2x.png");
                background-size: 48px; // Origin 96px - 2x 이미지이기에
              }
              @for $i from 1 through 13 {
                &:nth-child(#{$i}) { // &는 li선택자를 지칭
                  .category-icon {
                    background-position: 0 -#{($i - 1) * 24}px; // y축 조정
                  }
                }
              }
              // TODO: 클래스 선택자로 수정해야 함!
              &.hover {
                background-color: #ff5534;
                color: #fff;
                @for $i from 1 through 13 {
                  &:nth-child(#{$i}) { // &는 li선택자를 지칭
                    .category-icon {
                      background-position: -24px -#{($i - 1) * 24}px; // y축 조정
                    }
                  }
                }
                .depth {
                  display: block;
                }
              } // end
              .depth {
                display: none;
                width: 200px;
                height: 100%;
                border-left: 1px solid #eee;
                padding: 20px 0;
                box-sizing: border-box;
                position: fixed;
                top: 0;
                bottom: 0;
                left: 300px; // 네비게이션의 가로 너비 300px 지점 띄움
                background-color: #fff;
                overflow-y: auto;
                font-size: 15px;
                overflow-y: auto; // 세로로 넘치는 부분만 스크롤바 생성
                li { // depth -2 
                  height: 40px;
                  a {
                    padding: 0 20px;
                  }
                  &:hover {
                    background-color: #fafafa;
                    color: #ff5534;
                    a {
                      color: #ff5534;
                    }
                  }
                }
              }
            }
          }
        }
        &.major-services {
          .group__list {
            display: flex;   // 수평정렬
            flex-wrap: wrap; // 줄바꿈이 되는 형태
            li {
              width: 50%;
              height: 50px;
              a {
                padding-left: 25px;
              }
              &:hover {
                background-color: #fafafa;
                color: #ff5534;
                a {
                  color: #ff5534;
                }
              }
            }
          }
        } // end major services

        &.outlets {
          .group__title {
            cursor: pointer;
          }
          .group__list {
            padding-bottom: 25px;
            li {
              // height: auto; // 외부에서 영향을 주는게 없으면 빼도 된다. 
              margin-top: 10px;
              padding-left: 25px;
            }
          }
        }
      }
    }

    .exhibitions {
      width: 300px;
      height: 94px;
      a {
        display: block;
        width: inherit; // 300px 상속
        height: inherit; // 94px 상속
        cursor: pointer;
        img {
          width: inherit; // 300px 상속
          height: inherit; // 94px 상속
        }
      }
    }
  }
  .nav-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, .2);
    z-index: 98;
  }
</style>