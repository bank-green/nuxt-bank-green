// Code generated by Slice Machine. DO NOT EDIT.

import { defineAsyncComponent } from 'vue';
import { defineSliceZoneComponents } from '@prismicio/vue';

export const components = defineSliceZoneComponents({
  accordion_slice: defineAsyncComponent(
    () => import('./AccordionSlice/index.vue'),
  ),
  button_slice: defineAsyncComponent(() => import('./ButtonSlice/index.vue')),
  embed_slice: defineAsyncComponent(() => import('./EmbedSlice/index.vue')),
  error_message: defineAsyncComponent(() => import('./ErrorMessage/index.vue')),
  featured_in_slice: defineAsyncComponent(
    () => import('./FeaturedInSlice/index.vue'),
  ),
  image_slice: defineAsyncComponent(() => import('./ImageSlice/index.vue')),
  lead_gen: defineAsyncComponent(() => import('./LeadGen/index.vue')),
  share_pic_gallery_slice: defineAsyncComponent(
    () => import('./SharePicGallerySlice/index.vue'),
  ),
  table_slice: defineAsyncComponent(() => import('./TableSlice/index.vue')),
  team_member_slice: defineAsyncComponent(
    () => import('./TeamMemberSlice/index.vue'),
  ),
  text_slice: defineAsyncComponent(() => import('./TextSlice/index.vue')),
  thanks_slice: defineAsyncComponent(() => import('./ThanksSlice/index.vue')),
});
