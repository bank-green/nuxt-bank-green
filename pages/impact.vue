<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain pt-28 pb-16">
        <div
          class="prose mx-auto max-w-4xl text-center prose-headings:font-semibold"
        >
          <h1>
            <PrismicRichText
              :field="impact?.data.text1"
              fallback="Opened an account with a bank that doesn't finance fossil fuels?"
            />
          </h1>
          <h2 class="mt-0">
            <PrismicRichText
              :field="impact?.data.text2"
              fallback="Maximise your impact by letting us know."
            />
          </h2>
          <PrismicRichText
            :field="impact?.data.text3"
            fallback="Taking this survey helps advocate for change. Bank.Green uses your
            response to push fossil banks to divest, push sustainable eco banks to improve their
            customer experience, and encourage other people to join you in greening their finances."
          />
          <SwitchForm :opts="{ height: 600 }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
const { client } = usePrismic()
const { data: impact } = await useAsyncData('impact', () =>
  client.getByUID('textonlypages', 'impactpage'))
</script>
