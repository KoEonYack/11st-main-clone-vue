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
      <div class="container">
        <!-- [Group] 카테고리, 파트너스, 브랜드몰 각각의 단위들 --> 
        <div class="group categories">
          <h3 class="group__title">
            {{ navigations.categories.title }}
          </h3>
          <ul class="group__list">
            <li
              v-for="(item1, index) in navigations.categories.list"
              :key="item1.name">
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
      done: false
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
    .container {
      // Common Group CSS
      .group {
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
              @for $i from 0 to 12 {
                &:nth-child(#{$i}) { // &는 li선택자를 지칭
                  .category-icon {
                    background-position: 0 -#{$i * 24}px; // y축 조정
                  }
                }
              }
              // TODO: 클래스 선택자로 수정해야 함!
              &:hover {
                background-color: #ff5534;
                color: #fff;
                @for $i from 0 through 12 {
                  &:nth-child(#{$i}) { // &는 li선택자를 지칭
                    .category-icon {
                      background-position: -24px -#{$i * 24}px; // y축 조정
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
              }
            }
          }
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