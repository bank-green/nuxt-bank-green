import MyComponent from '../../../../slices/AccordionSlice';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/AccordionSlice'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"contentlink":{"id":"mock_document_id","link_type":"Document","type":"mock","tags":[],"lang":"en-us","slug":null,"first_publication_date":"1970-01-01T00:00:01+0000","last_publication_date":"1970-01-01T01:00:00+0000"}},"slice_type":"accordion_slice","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''

export const _RichText = () => ({
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
      mock: {"variation":"richText","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":"magic","content":[{"type":"paragraph","text":"Ad culpa eiusmod adipisicing consectetur. Enim est dolor irure enim incididunt elit magna aliquip nisi irure minim consectetur.","spans":[]}]},"slice_type":"accordion_slice","id":"_RichText"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_RichText.storyName = ''

export const _RichTextWithStep = () => ({
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
      mock: {"variation":"richTextWithStep","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":"simplest","content":[{"type":"paragraph","text":"Laborum officia mollit voluptate laboris occaecat fugiat sunt est cupidatat reprehenderit elit nulla minim nulla. Officia laboris incididunt exercitation adipisicing esse do nostrud pariatur commodo tempor quis amet deserunt.","spans":[]}],"step":"past"},"slice_type":"accordion_slice","id":"_RichTextWithStep"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_RichTextWithStep.storyName = ''
