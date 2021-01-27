<template>
  <div>
    <header>
      <div class="inner">
        <div
          class="open-nav-drawer"
          @click="onNav"></div>
        <a
          href="javascript:void(0)"
          class="logo"></a>
        <div class="search">
          <input 
            v-model="searchText"
            placeholder="찾고 싶은 상품을 검색해 보세요!"
            type="text" 
            @keyup.enter="search" />
          <div
            class="search__icon"
            @click="search"></div> <!-- BEM -->
        </div>
        <div class="ranking">
          <!-- Slider main container -->
          <div 
            ref="swiper"
            class="swiper-container">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
              <!-- Slides -->
              <div
                v-for="(rank, index) in rankings.rankings"
                :key="rank.name"
                class="swiper-slide">
                <a :href="rank.href">
                  <span class="index">{{ index + 1 }}</span>
                  <span class="name">{{ rank.name }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <ul class="user-menu">
          <li class="my">
            <a href="javascript:void(0)"></a>
            <ul class="my__menu">
              <li
                v-for="item in myMenu"
                :key="item.name">
                <a :href="item.href">
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)"></a>
          </li>
          <li>
            <a href="javascript:void(0)"></a>
          </li>
          <li>
            <a
              href="javascript:void(0)"></a>
          </li>
        </ul>
      </div>
    </header>
    <div
      :class="{ fixed: isFixed }"
      class="utils">
      <div class="inner">
        <ul>
          <li>
            <a href="javascript:void(0)">베스트</a>
          </li>
          <li>
            <a href="javascript:void(0)">쿠폰/혜택</a>
          </li>
          <li>
            <a href="javascript:void(0)">기획전</a>
          </li>
          <li>
            <a href="javascript:void(0)">오늘장보기</a>
          </li>
          <li>
            <a href="javascript:void(0)">T공식대리점</a>
          </li>
          <li>
            <a
              class="shocking-deal"
              href="javascript:void(0)"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'

export default {
    data() {
        return {
          searchText: '',
          rankings: {},
          isFixed: false,
          myMenu: [
            { name: '나의 쿠폰', href: 'javascript:void(0)' },
            { name: '주문/배송조회', href: 'javascript:void(0)' },
            { name: '취소/반품/교환', href: 'javascript:void(0)' },
            { name: '고객센터', href: 'javascript:void(0)' },
            { name: '회원정보', href: 'javascript:void(0)' }
          ]
        }
    },
    mounted () {
      this.init()
    },
    methods: {
        async init () {
          this.rankings = await this.$fetch({
            requestName: 'rankings'
          })
    
          this.$nextTick(() => {
            // https://swiperjs.com/api/
            new Swiper(this.$refs.swiper, {
              direction: 'vertical',
              speed: 1000,
              autoplay: {
                delay: 3000
              },
              loop: true
            })
          })
        },
        onNav() {
            // Open LNB
            this.$store.dispatch('navigation/onNav') // navigation파일 안에 onNav를 실행한다. 
        },
        async search () { // 비동기동작
          if (!this.searchText.trim()) return

          const res = await this.$search({
            searchText: this.searchText
          })
          console.log(res)
          // location = res
        }
    }
}
</script>

<style scoped lang="scss">
  header {
    .inner {
      display: flex;
      align-items: center;
      height: 120px;

      .open-nav-drawer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 
          0 2px 6px rgba(#000, .06),
          0 0 1px rgba(#000, .4);
        &::after {
          content: "";
          display: block;
          width: 36px;
          height: 36px;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
          background-position: -302px -203px;
          background-size: 363px;
        }
      }
      .logo {
        display: block;
        width: 94px;
        height: 40px;
        margin: 0 24px;
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
        background-position: -162px 0;
        background-size: 363px;
        cursor: pointer;
      }
      .search {
        position: relative;
        input {
          // display: inline-block;
          width: 500px;
          height: 50px;
          padding: 0 27px;
          border: 1px solid #ddd;
          border-radius: 25px;
          box-sizing: border-box; // padding, border를 500, 50에 맞추어서 
          background-color: #fafafa;
          font-size: 18px;
          outline: none; // input요소에 파란선을 만드는 요인
          font-family: 'Noto Sans KR', sans-serif;
          &::placeholder { // 사용자에게 이런것을 입력하라는 힌트 글자 스타일 
            color: #bbb; // 약회색으로
          }
        }
        // & ==> .search
        // .search__icon
        &__icon {
          width: 50px;
          height: 50px;
          position: absolute;
          top: 0;
          right: 0;
          cursor: pointer;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
          background-position: -162px -45px;
          background-size: 363px;
        }
      } // end search
      .ranking {
        width: 210px;
        margin: 0 30px;
        .swiper-container {
          width: 182px;
          height: 28px;
          .swiper-slide {
            a {
              display: block;     // 링크를 잡기 위해서 블럭 요소가 되어야 한다
              height: 28px;       // a 링크 영역을 잡는 것 
              line-height: 28px;  // 글씨를 수직 가운데 위치
              text-decoration: none;
              font-size: 15px;
              color: #333;
              font-weight: 700;
              span.index {
                margin-right: 10px;
                color: #f43142;
                font-style: italic;
              }
              &:hover span.name {
                color: #f43142;
              }
            }
          }
        }
      }

      .user-menu { // TEST
        display: flex;
        > li {
          margin-right: 25px;
          padding: 7px 0;
          position: relative;
          &:last-child {
            margin-right: 0;
          }
          > a {
            display: block;
            width: 48px;
            height: 48px;
            background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
            background-size: 363px;
          }
          &:nth-child(1) > a { background-position: -106px -145px; }
          &:nth-child(2) > a { background-position: 0px -198px; }
          &:nth-child(3) > a { background-position: -53px -198px; }
          &:nth-child(4) > a { background-position: -94px -70px; }
          &:nth-child(1) > a:hover { background-position: -53px -145px; }
          &:nth-child(2) > a:hover { background-position: -159px -145px; }
          &:nth-child(3) > a:hover { background-position: 0px -145px; }
          &:nth-child(4) > a:hover { background-position: -106px -198px; }
          &.my {
            &:hover {
              .my__menu {
                display: block;
              }
            }
            .my__menu {
              display: none;
              width: 170px;
              padding: 15px 0;
              position: absolute;
              top: 60px;
              left: 0;
              z-index: 2;
              border: 1px solid #eee;
              border-radius: 6px;
              box-sizing: border-box;
              box-shadow: 0 6px 24px -8px rgba(#000,.12);
              background-color: #fff;
              li {
                a {
                  display: block;
                  padding: 7px 10px 7px 25px;
                  font-size: 15px;
                  &:hover {
                    color: #f43142;
                    background: #fafafa;
                  }
                }
              }
            }
          }
        }
      } // end user-nemu
    } // end inner
  } // end header
  
  .utils {
    border-top: 1px solid #f1f1f1;
    &.fixed {
      padding-top: 120px;
    }
    .inner {
      width: 1240px;
      margin: 0 auto;
    }
    ul {
      display: flex;
      li {
        margin-right: 25px;
        &:last-child {
          margin-right: 0;
        }
        a {
          display: flex;
          align-items: center;
          height: 66px;
          font-size: 17px;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #f43142;
            opacity: 0;
          }
          &:hover::after {
            opacity: 1;
          }
          &.shocking-deal {
            width: 63px;
            background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
            background-position: -94px 0;
            background-size: 363px;
          }
        }
      }
    }
  }
</style>