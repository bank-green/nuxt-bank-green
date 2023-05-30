import { reactive } from 'vue'

const store = {
  state: reactive<{
    imageLoaded: any
  }>({
    imageLoaded: {},
  }),

  setImageLoaded(src : string, currentSrc? : string) {
    if (!currentSrc) {
      this.state.imageLoaded[src] = src
      return
    }
    this.state.imageLoaded[src] = currentSrc
  },
}

export default store