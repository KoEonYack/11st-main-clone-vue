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
        ref="container"
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
        <div 
          ref="outlets"
          class="group outlets">
          <div
            class="group__title"
            @click="toggleGroup('outlets')">
            {{ navigations.outlets.title }}
            <div class="toggle-list"></div>
          </div> 
          <ul
            v-show="isShowOutlets"
            v-cloak
            class="group__list">
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

        <div
          ref="partners"
          class="group partners"
          @mouseenter="categoryHover = -1">
          <div
            class="group__title"
            @click="toggleGroup('partners')">
            {{ navigations.partners.title }}
            <div class="toggle-list"></div>
          </div>
          <ul
            v-show="isShowPartners"
            v-cloak
            class="group__list">
            <li
              v-for="item in navigations.partners.list"
              :key="item.name">
              <a :href="item.href">
                <img
                  :src="item.src"
                  :alt="item.name"
                  width="112" />
              </a>
            </li>
          </ul>
        </div>

        <div
          ref="brandMall"
          class="group brand-mall"
          @mouseenter="categoryHover = -1">
          <div
            class="group__title"
            @click="toggleGroup('brandMall')">
            {{ navigations.brandMall.title }}
            <div class="toggle-list"></div>
          </div>
          <ul
            v-show="isShowBrandMall"
            v-cloak
            class="group__list">
            <li
              v-for="item in navigations.brandMall.list"
              :key="item.name">
              <a :href="item.href">
                <img
                  :src="item.src"
                  :alt="item.name"
                  width="55" />
                <span class="brand-name">{{ item.name }}</span>
              </a>
            </li>
          </ul>
        </div> <!-- End Brand mall -->
      </div> <!-- End Container --> 

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
import _upperFirst from 'lodash/upperFirst'

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
    toggleGroup (name) {
      // outlets => Outlets
      const pascalCaseName = _upperFirst(name)
      
      // this[name1], this.$data.[name1] 같은 표현
      this.$data[`isShow${pascalCaseName}`] = !this.$data[`isShow${pascalCaseName}`] // eg. this.$data['isShowOutlets']
      if (this.$data[`isShow${pascalCaseName}`]) {
        // 반응성이 나타난 후 콜백 실행!
        // 데이터가 바뀐 다음 화면이 바뀌게 함 
        this.$nextTick(() => {
          // 컨테이너 상단위치 = 요소 상단위치
          this.$refs.container.scrollTop = this.$refs[name].offsetTop - 100 // -100, 제목 조절
        })
      }
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
          position: relative;

          .toggle-list {
            position: absolute; // 상위 위치상의 부모요소 relative를 찝어주어야 한다.
            top: 0;
            right: 0;
            width: 60px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            &::after {
              content: "";
              display: block;
              width: 7px;
              height: 7px;
              margin-top: -3px;
              border: solid #333;
              border-width: 0 1px 1px 0; // ㄴ y축 회전 모습
              box-sizing: border-box;
              transform: rotate(45deg); // 45도 돌림
            }
          }
        }
        &__list { // .group__list
          li {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            cursor: pointer;
            a {
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
            }
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
                // .depth {
                //   display: block;
                // }
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
              &.hover .depth {
                display: block;
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
        } // end outlets

        &.partners {
          .group__title {
            cursor: pointer;
          }
          .group__list {
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 25px;
            li {
              width: 50%;
              height: 60px;
              a {
                justify-content: center;
              }
            }
          }
        } // end partners

        &.brand-mall {
          .group__title {
            cursor: pointer;
          }
          .group__list {
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 25px;
            li {
              width: 33.33%;
              height: auto;
              margin-top: 20px;
              &:nth-child(-n+3) {
                margin-top: 0;
              }
              a {
                justify-content: center;
                flex-direction: column;
                span.brand-name {
                  font-size: 14px;
                  color: #666;
                }
              }
            }
          }
        } // end brand-mall
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