<template>
  <div 
    :style="`background-color: ${currentColor};`"
    class="billboard">
    <div class="inner">
      <div 
        ref="swiper"
        class="swiper-container">
        <div class="swiper-wrapper">
          <div 
            v-for="item in billboards"
            :key="item.name"
            class="swiper-slide">
            <img
              :data-src="item.src"
              class="swiper-lazy" />
            <div class="swiper-lazy-preloader"></div> <!-- 로딩 에니메이션 -->
          </div>
        </div>
      </div>
      <div class="controls">
        <div class="controller">
          <div
            :class="{ pause: isAutoplay }"
            class="autoplay"
            @click="toggleAutoplay"></div>
        </div>
        <div class="controller">
          <div class="pagination">
            <strong>{{ currentIndex + 1 }}</strong>
            <span>/ {{ billboards.length }}</span>
          </div>
          <a
            class="open-more"
            href="javascript:void(0)"></a>
        </div>
        <div class="controller">
          <div class="navi prev"></div>
          <div class="navi next"></div>
        </div>
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
            billboards: [],
            currentIndex: 0,
            currentColor: '',
            isAutoplay: false,
            swiper: null
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        async init() {
            this.billboards = await this.$fetch({
                requestName: 'billboards'
            })

            this.$nextTick(() => {
                this.swiper = new Swiper(this.$refs.swiper, {
                    effect: 'fade',
                    speed: 1000,
                    autoplay: {
                        delay: 3000
                    },
                    loop: true,
                    preloadImages: false, // lazy-loading
                    lazy: {
                        loadPrevNext: true,
                        loadPrevNextAmount: 2
                    },
                    navigation: {
                        nextEl: '.billboard .next',
                        prevEl: '.billboard .prev'
                    },
                    // on: Evnent
                    on: {
                        slideChange: swiper => {
                            const { realIndex } = swiper
                            this.currentIndex = realIndex
                            this.currentColor = this.billboards[realIndex].color
                        },
                        autoplayStart: () => {
                            this.isAutoplay = true
                        },
                        autoplayStop: () => {
                            this.isAutoplay = false
                        }
                    }
                })
            })
        },
        toggleAutoplay() {
            if (this.isAutoplay) { // 자동 재생중이면 -> 멈추어라
                this.swiper.autoplay.stop()
            } else {
                this.swiper.autoplay.start()
            }
        }
    }
}
</script>

<style scoped lang="scss">
.billboard {
    transition: background-color 1s;  // 배경이 바뀌면 1촏종안ㅇ 배경 색상이 바뀐다. 
    .inner {
        .swiper-container {
            width: 1240px;
            height: 400px;
            .swiper-lazy-preloader {
                border-color: #F43242;
                border-top-color: transparent;
            }
        }
        .controls {
            display: flex;
            position: absolute;
            bottom: 25px;   // 밑에서 25px 
            right: 0;       // 우측에 뭍임
            z-index: 1;     // 슬라이드보다 위 
            .controller {
                background-color: rgba(#000, .2);
                border-radius: 22.5px;
                margin-right: 10px;
                display: flex; // 내부 아이탬 수평정렬
                &:last-child {
                    margin-right: 0;
                }
                .autoplay {
                    width: 45px; // 영역을 잡아서 아이콘이 가운데 들어가도록
                    height: 45px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &.pause {       // 일시정지일때 
                        &::after {  // 일시정지 아이콘
                            background-position: -170px -29px;
                        }
                    }
                    &::after { // 실제 아이콘
                        content: "";    // 가상요소 필수 선택자 
                        display: block;
                        width: 24px;
                        height: 24px;
                        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/main_2x.png");
                        background-position: -170px -87px;
                        background-size: 209px;
                    }
                } // end autoplay
                .pagination {
                    display: flex;
                    align-items: center;
                    height: 45px;
                    padding: 0 4px 0 22px;
                    color: #ddd;
                    font-size: 17px;
                    strong {
                        color: #fff;
                        margin-right: 4px;
                        font-weight: 700;
                    }
                }
                .open-more {
                    width: 45px;
                    height: 45px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &::after {
                        content: "";
                        display: block;
                        width: 24px;
                        height: 24px;
                        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/main_2x.png");
                        background-position: -170px 0px;
                        background-size: 209px;
                    }
                }
                .navi { // prev, next 공통적인 스타일 
                    width: 45px;
                    height: 45px;
                    display: flex;
                    position: relative;
                    outline: none;                                                                                                      
                    cursor: pointer;
                    &::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        width: 24px;
                        height: 24px;
                        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/main_2x.png");
                        background-size: 209px;
                    }
                }
                .prev {
                    &::after {
                        right: 6px;
                        background-position: -170px -58px;
                    }
                }
                .next {
                    &::after {
                        left: 6px;
                        background-position: -170px -116px;
                    }
                }
            }
        }
    }
}
</style>