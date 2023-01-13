import MyComponent from '../../../../slices/ButtonSlice';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ButtonSlice'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"label":"sugar","link":{"link_type":"Web","url":"http://twitter.com"}},"slice_type":"button_slice","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
