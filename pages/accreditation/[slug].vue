<template>
  <div class="page">
    <section class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28 max-w-screen">
      <div class="page-fade-in relative contain pb-20 lg:pt-12 z-10">
        <article class="relative flex flex-col items-center border rounded-2xl w-full max-w-7xl min-h-[504px] px-4 py-10 bg-white text-center gap-10">
          <h1 class="text-3xl lg:text-5xl font-semibold text-gray-800">
            <template v-if="accred?.data.hero_title">
              {{ accred?.data.hero_title }}
            </template>
            <template v-else>
              Your money is building a <span class="green-line">greener future</span>
            </template>
          </h1>
          <div class="lg:px-16 text-base lg:text-xl text-gray-700 max-w-4xl">
            <template v-if="accred?.data.hero_description">
              {{ accred.data.hero_description }}
            </template>
            <template v-else>
              <p class="pb-6">
                By choosing to spend your money with businesses like <b class="font-bold">[business name]</b>, you are
                ensuring your financial
                support contributes to a sustainable, liveable future.
              </p>
              <p>
                <b class="font-bold">[Business name]</b> banks with <span class="font-bold">[green bank name]</span>
                which means your money is supporting projects like:
              </p>
            </template>
          </div>
          <AccreditationProjectCarousel
            class="lg:absolute lg:bottom-0 lg:left-80 lg:translate-y-16"
            :projects="accred?.data.projects"
          />
          <img
            class="absolute bottom-0 lg:left-36 w-32 h-32 translate-y-16 lg:translate-y-10"
            src="/img/certification/fossil-free-certified.png"
            alt="Accreditation Logo"
          >
        </article>
      </div>
      <Swoosh />
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { client } = usePrismic()
const slug = route.params.slug ?? ''
const { data: accred } = await useAsyncData(slug[0], () =>
  client.getByUID('accreditationpage', slug[0])
)

/*
usePrismicSEO(gpe.value?.data) */

</script>
<style>
.green-line {
  padding-bottom: 20px;
  background-image: url('/img/backgrounds/green-line.svg');
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 95%;
  word-break: keep-all;
  white-space: nowrap;
}
</style>
