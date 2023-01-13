import MyComponent from '../../../../slices/ImageSlice';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ImageSlice'
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
      mock: { "variation": "default", "version": "sktwi1xtmkfgx8626", "items": [{}], "primary": { "image": { "dimensions": { "width": 900, "height": 500 }, "alt": null, "copyright": null, "url": "https://images.unsplash.com/photo-1531771686035-25f47595c87a" }, "caption": [{ "type": "paragraph", "text": "Minim ex quis et ex dolor duis exercitation sit enim. Tempor et ea ex reprehenderit non.", "spans": [] }] }, "slice_type": "image_slice", "id": "_Default" }
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
