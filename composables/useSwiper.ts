import type { SwiperContainer } from 'swiper/element/bundle'
import { register } from 'swiper/element/bundle'
import { Pagination } from 'swiper/modules'
import type { SwiperOptions } from 'swiper/types'

register()

const SWIPER_DEFAULT_PARAMETERS: SwiperOptions = {
  modules: [Pagination],
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 20,
  navigation: false,
  pagination: {
    clickable: true,
  },
  breakpoints: {
    1028: {
      slidesPerView: 2,
    },
  },
  injectStyles: [`
    :host {
      --swiper-theme-color: #87B448;
      --swiper-pagination-bullet-size: 16px;
      --swiper-pagination-bullet-width: 16px;
      --swiper-pagination-bullet-height: 16px;
      --swiper-pagination-bottom: 0px;
      --swiper-pagination-bullet-inactive-color: #D9D9D9;
      --swiper-pagination-bullet-inactive-opacity: 1;
    }
    .swiper {
      padding-bottom: 34px
    }
    .swiper-pagination-bullet {
      transition: transform 0.15s ease-out;
    }
    .swiper-pagination-bullet-active {
      transform: scale(1.25);
      transition: transform 0.15s ease-out;
    }
    `],
}

export function useSwiper(options?: SwiperOptions) {
  const swiperRef = ref<SwiperContainer>()

  onMounted(() => {
    if (swiperRef.value) {
      Object.assign(swiperRef.value, { ...SWIPER_DEFAULT_PARAMETERS, ...options })
      swiperRef.value.initialize()
    }
  })

  return swiperRef
}
