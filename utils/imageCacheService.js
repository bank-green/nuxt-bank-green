import { reactive } from 'vue'

const store = {
  state: reactive({
    imageLoaded: {},
  }),

  setImageLoaded(src, currentSrc) {
    if (!currentSrc) {
      this.state.imageLoaded[src] = src
      return
    }
    this.state.imageLoaded[src] = currentSrc
  },
}

export default store