import MyComponent from '../../../../slices/SharePicGallerySlice';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/SharePicGallerySlice'
}


export const _Default = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{},"slice_type":"share_pic_gallery_slice","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
