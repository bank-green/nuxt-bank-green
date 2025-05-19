<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28 ml-28 mt-16">
        <ul>
          <li
            v-for="bank in banks"
            :key="bank.tag"
          >
            <p>
              <a
                v-if="bank.isSustainable"
                :href="`/sustainable-eco-banks/${bank.tag}`"
              >{{ bank.name }}</a>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: banks } = await useAsyncGql({
  operation: 'AllBanksList',
  options: {
    transform: data =>
      !data?.brands?.edges
        ? []
        : data.brands.edges
          .map(o => o?.node && { name: o.node.name, tag: o.node.tag, isSustainable: o.node.commentary?.showOnSustainableBanksPage },
          ).filter(isTruthy)
    ,
  },
})
</script>
