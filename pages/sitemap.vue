<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28 ml-28 mt-8">
        <ul>
          <li
            v-for="bank in banks"
            :key="bank.tag"
          >
            <a
              :href="`/banks/${bank.tag}`"
              target="_blank"
              rel="noopener noreferrer"
            >{{ bank.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const banks = await $axios.$get('https://example.com/api/banks')
    return { banks }
  },
}
</script>
