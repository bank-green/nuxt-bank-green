<script setup lang="ts">
import { computed, watchEffect, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { toCardBank } from '../../utils/sustainableEcoBanksUtils';

const route = useRoute();
const tag = computed(() => String(route.params.bankTag || '').toLowerCase());
const { data } = await useAsyncGql('BrandByTagQuery', { tag: tag.value });

onMounted(() => {
  watchEffect(() => {
    const node = data.value?.brand;
    if (node) {
      console.log('bank name:', node.name ?? '(no name)');
      // optional: util also logs internally
      toCardBank(node);
    }
  });
});
</script>

<template>
  <h1>HELLO</h1>
</template>
